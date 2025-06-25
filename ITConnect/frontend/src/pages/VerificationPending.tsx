import { useLocation, Navigate } from 'react-router-dom';
import { Mail, Clock } from 'lucide-react';

export default function VerificationPending() {
  const location = useLocation();
  const email = location.state?.email;
  const customMessage = location.state?.message;

  if (!email) {
    return <Navigate to="/company-register" replace />;
  }

  const isCompanyEmail = email.includes('@company.com'); // This is a simple check, adjust as needed

  return (
    <div className="min-h-screen bg-ivory py-16 px-4">
      <div className="max-w-md mx-auto text-center">
        <div className="w-16 h-16 bg-cream rounded-full flex items-center justify-center mx-auto mb-6">
          {customMessage ? <Clock className="w-8 h-8 text-charcoal" /> : <Mail className="w-8 h-8 text-charcoal" />}
        </div>

        <h1 className="font-playfair text-4xl font-semibold text-charcoal mb-4">
          {customMessage ? 'Verification Pending' : 'Check Your Email'}
        </h1>

        {customMessage ? (
          <p className="text-stone text-lg mb-6">
            {customMessage}
          </p>
        ) : (
          <>
            <p className="text-stone text-lg mb-6">
              We've sent a verification link to <strong>{email}</strong>
            </p>

            <div className="bg-cream p-6 rounded-lg mb-8">
              <h2 className="font-semibold text-charcoal mb-4">Next Steps:</h2>
              <ol className="text-left text-stone space-y-3">
                <li>1. Check your email inbox</li>
                <li>2. Click the verification link in the email</li>
                <li>3. Complete the verification process</li>
                {isCompanyEmail ? (
                  <li>4. You'll be automatically redirected to your dashboard</li>
                ) : (
                  <li>4. Wait for admin verification</li>
                )}
              </ol>
            </div>
          </>
        )}

        <p className="text-stone text-sm">
          {customMessage 
            ? "We'll notify you via email once your account is approved."
            : "Didn't receive the email? Check your spam folder or contact our support team."}
        </p>
      </div>
    </div>
  );
} 