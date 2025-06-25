import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { API_ENDPOINTS } from '@/config/api';

export default function VerifyEmail() {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');
  const [requiresManualVerification, setRequiresManualVerification] = useState(false);

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.COMPANY.VERIFY_EMAIL(token || ''), {
          method: 'GET',
        });

        const data = await response.json();

        if (response.ok) {
          setStatus('success');
          setMessage(data.message);
          setRequiresManualVerification(data.requiresManualVerification);

          if (data.token) {
            localStorage.setItem('token', data.token);
          }

          setTimeout(() => {
            if (!data.requiresManualVerification && data.isFullyVerified) {
              navigate('/company-dashboard', { replace: true });
            } else {
              navigate('/', { replace: true });
            }
          }, 5000);
        } else {
          throw new Error(data.message || 'Verification failed');
        }
      } catch (error) {
        setStatus('error');
        setMessage(error instanceof Error ? error.message : 'Verification failed');
      }
    };

    verifyEmail();
  }, [token, navigate]);

  const handleRedirect = () => {
    if (!requiresManualVerification) {
      navigate('/company-dashboard', { replace: true });
    } else {
      navigate('/', { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-ivory py-16 px-4">
      <div className="max-w-md mx-auto text-center">
        {status === 'loading' && (
          <>
            <Loader2 className="w-16 h-16 text-charcoal animate-spin mx-auto mb-6" />
            <h1 className="font-playfair text-4xl font-semibold text-charcoal mb-4">
              Verifying Your Email
            </h1>
            <p className="text-stone text-lg">
              Please wait while we verify your email address...
            </p>
          </>
        )}

        {status === 'success' && (
          <>
            <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-6" />
            <h1 className="font-playfair text-4xl font-semibold text-charcoal mb-4">
              Email Verified!
            </h1>
            <p className="text-stone text-lg mb-6">{message}</p>
            {requiresManualVerification ? (
              <div className="bg-cream p-6 rounded-lg mb-8">
                <h2 className="font-semibold text-charcoal mb-4">Next Steps:</h2>
                <p className="text-stone">
                  Your email has been verified, but your account requires additional verification by our admin team.
                  We'll review your application and notify you once it's approved.
                </p>
              </div>
            ) : (
              <p className="text-stone text-lg mb-6">
                Your account is fully verified. You'll be redirected to your dashboard in 5 seconds...
              </p>
            )}
            <Button
              onClick={handleRedirect}
              className="bg-charcoal text-white hover:bg-charcoal/90"
            >
              {requiresManualVerification ? 'Return to Homepage' : 'Go to Dashboard'}
            </Button>
          </>
        )}

        {status === 'error' && (
          <>
            <XCircle className="w-16 h-16 text-red-600 mx-auto mb-6" />
            <h1 className="font-playfair text-4xl font-semibold text-charcoal mb-4">
              Verification Failed
            </h1>
            <p className="text-stone text-lg mb-6">{message}</p>
            <Button
              onClick={() => navigate('/', { replace: true })}
              className="bg-charcoal text-white hover:bg-charcoal/90"
            >
              Return to Homepage
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
