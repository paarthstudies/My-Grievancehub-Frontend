import React, { useState } from 'react';
import { 
  User, Shield, Lock, Mail, Hash, Building2, KeyRound, ArrowRight, 
  ChevronLeft, CheckCircle2, Eye, EyeOff, Sparkles, Smartphone, X, Zap 
} from 'lucide-react';
import { SUBSTATIONS_LIST } from '../data/mockData';

export function AuthModal({ 
  isOpen, 
  onClose, 
  defaultRole = 'consumer', 
  onLoginSuccess,
  isDedicatedView = false,
  onSwitchToDedicated,
  onSwitchToModal
}) {
  const [role, setRole] = useState(defaultRole); // 'consumer' | 'officer' | 'admin'
  const [authMethod, setAuthMethod] = useState('otp'); // 'otp' | 'password' for consumer
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  // Form states
  const [consumerId, setConsumerId] = useState('028549102941');
  const [consumerPassword, setConsumerPassword] = useState('Consumer@2026');
  const [otpValue, setOtpValue] = useState('482910');

  const [officerEmail, setOfficerEmail] = useState('s.more@msedcl.gov.in');
  const [officerPassword, setOfficerPassword] = useState('OfficerPass@123');
  const [substationCode, setSubstationCode] = useState(SUBSTATIONS_LIST[0]);

  const [adminUsername, setAdminUsername] = useState('superadmin_msceb');
  const [adminPassword, setAdminPassword] = useState('AdminSecure#2026');
  const [securityToken, setSecurityToken] = useState('MSCEB-SEC-7749');

  if (!isOpen && !isDedicatedView) return null;

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    setSuccessMsg('');
    setOtpSent(false);
  };

  const handleQuickDemoFill = () => {
    if (role === 'consumer') {
      setConsumerId('028549102941');
      setConsumerPassword('Consumer@2026');
      setOtpValue('482910');
    } else if (role === 'officer') {
      setOfficerEmail('s.more@msedcl.gov.in');
      setOfficerPassword('OfficerPass@123');
      setSubstationCode(SUBSTATIONS_LIST[1]);
    } else {
      setAdminUsername('superadmin_msceb');
      setAdminPassword('AdminSecure#2026');
      setSecurityToken('MSCEB-SEC-7749');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccessMsg('');

    setTimeout(() => {
      setIsLoading(false);
      let userObj = {};

      if (role === 'consumer') {
        userObj = {
          role: 'consumer',
          id: consumerId,
          displayName: 'Rajesh Sharma',
          badge: 'Domestic LT Consumer',
          accountNo: consumerId
        };
        setSuccessMsg(`Welcome, Rajesh Sharma! Authenticated with Consumer ID ${consumerId}`);
      } else if (role === 'officer') {
        userObj = {
          role: 'officer',
          id: officerEmail,
          displayName: 'S. More (AE)',
          badge: 'Assistant Engineer - Substation 04',
          substation: substationCode
        };
        setSuccessMsg(`Welcome, Officer More! Access granted to ${substationCode}`);
      } else {
        userObj = {
          role: 'admin',
          id: adminUsername,
          displayName: 'State Grid Administrator',
          badge: 'MSCEB Central Operations',
          token: securityToken
        };
        setSuccessMsg(`Authenticated to MSCEB Superadmin Console.`);
      }

      setTimeout(() => {
        if (onLoginSuccess) {
          onLoginSuccess(userObj);
        }
        if (onClose) onClose();
      }, 900);
    }, 700);
  };

  const content = (
    <div className="w-full max-w-lg mx-auto bg-white rounded-3xl sm:rounded-4xl border border-neutral-200/90 shadow-2xl p-6 sm:p-10 relative overflow-hidden transition-all">
      {/* Decorative top ambient glow */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-36 bg-gradient-to-b from-[#D2F843]/30 via-[#10B981]/15 to-transparent blur-2xl pointer-events-none" />

      {/* Top action row: Back button & Close */}
      <div className="flex items-center justify-between pb-4 relative z-10">
        <button
          onClick={onClose}
          className="flex items-center gap-1.5 text-xs font-semibold text-neutral-500 hover:text-neutral-900 transition-colors py-1 px-2.5 rounded-full hover:bg-neutral-100"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Landing Page</span>
        </button>

        <div className="flex items-center gap-2">
          {/* Quick Demo Fill Pill */}
          <button
            type="button"
            onClick={handleQuickDemoFill}
            className="text-[11px] font-bold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 px-2.5 py-1 rounded-full border border-neutral-200 transition-colors flex items-center gap-1"
            title="Auto-fill sample credentials for this role"
          >
            <Sparkles className="w-3 h-3 text-emerald-600" />
            <span>Auto-Fill Demo</span>
          </button>

          {!isDedicatedView && onClose && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Auth Card Header with clean editorial serif accent */}
      <div className="text-center pt-2 pb-6 relative z-10">
        {/* Subtle MSCEB brand badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-xs font-semibold text-neutral-700 mb-3">
          <div className="w-4 h-4 rounded bg-neutral-900 flex items-center justify-center text-[#D2F843]">
            <Zap className="w-2.5 h-2.5 fill-current" />
          </div>
          <span>MSCEB Citizen & Staff Gateway</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-serif font-medium text-neutral-900 tracking-tight">
          Welcome to Grievance Hub
        </h2>
        <p className="text-xs sm:text-sm text-neutral-500 mt-2 max-w-sm mx-auto">
          Single sign-on for Maharashtra electricity consumers, maintenance field engineers, and grid administrators.
        </p>
      </div>

      {/* Role Switcher (Segmented Tab Control) */}
      <div className="relative z-10 mb-6">
        <div className="grid grid-cols-3 p-1.5 rounded-full bg-neutral-100 border border-neutral-200 shadow-inner">
          <button
            type="button"
            onClick={() => handleRoleChange('consumer')}
            className={`py-2 px-3 text-xs sm:text-sm font-semibold rounded-full transition-all flex items-center justify-center gap-1.5 ${
              role === 'consumer'
                ? 'bg-neutral-900 text-white shadow-soft-sm'
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-white/60'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Consumer</span>
          </button>

          <button
            type="button"
            onClick={() => handleRoleChange('officer')}
            className={`py-2 px-3 text-xs sm:text-sm font-semibold rounded-full transition-all flex items-center justify-center gap-1.5 ${
              role === 'officer'
                ? 'bg-neutral-900 text-white shadow-soft-sm'
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-white/60'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Officer</span>
          </button>

          <button
            type="button"
            onClick={() => handleRoleChange('admin')}
            className={`py-2 px-3 text-xs sm:text-sm font-semibold rounded-full transition-all flex items-center justify-center gap-1.5 ${
              role === 'admin'
                ? 'bg-neutral-900 text-white shadow-soft-sm'
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-white/60'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Admin</span>
          </button>
        </div>
      </div>

      {/* Success Notification Banner */}
      {successMsg && (
        <div className="mb-4 p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Role-Specific Form Fields */}
      <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
        
        {/* ================= ROLE 1: CONSUMER LOGIN ================= */}
        {role === 'consumer' && (
          <div className="space-y-4 animate-fade-in">
            {/* Consumer ID (12 digits) */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-neutral-700">
                  Consumer ID / CA Number (12 Digits)
                </label>
                <span className="text-[11px] text-neutral-400 font-mono">Found on electricity bill</span>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                  <Hash className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  maxLength={12}
                  value={consumerId}
                  onChange={(e) => setConsumerId(e.target.value.replace(/\D/g, ''))}
                  placeholder="e.g. 028549102941"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-full border border-neutral-300 text-sm font-medium text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10 font-mono transition-all"
                />
              </div>
            </div>

            {/* Sub-toggle: OTP vs Password */}
            <div className="flex items-center justify-between text-xs pt-1">
              <span className="font-medium text-neutral-500">Authentication Method:</span>
              <div className="inline-flex rounded-full bg-neutral-100 p-0.5 border border-neutral-200">
                <button
                  type="button"
                  onClick={() => setAuthMethod('otp')}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                    authMethod === 'otp' ? 'bg-white shadow-soft-sm text-neutral-900 font-bold' : 'text-neutral-500'
                  }`}
                >
                  Mobile OTP
                </button>
                <button
                  type="button"
                  onClick={() => setAuthMethod('password')}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                    authMethod === 'password' ? 'bg-white shadow-soft-sm text-neutral-900 font-bold' : 'text-neutral-500'
                  }`}
                >
                  Password
                </button>
              </div>
            </div>

            {/* Conditional input based on OTP or Password */}
            {authMethod === 'otp' ? (
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                  One Time Password (OTP)
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                      <Smartphone className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      maxLength={6}
                      value={otpValue}
                      onChange={(e) => setOtpValue(e.target.value)}
                      placeholder="Enter 6-digit OTP"
                      required
                      className="w-full pl-10 pr-4 py-2.5 rounded-full border border-neutral-300 text-sm font-medium text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10 font-mono tracking-widest transition-all"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => { setOtpSent(true); }}
                    className="px-4 py-2.5 rounded-full text-xs font-semibold border border-neutral-300 bg-neutral-50 hover:bg-neutral-100 text-neutral-800 transition-colors whitespace-nowrap"
                  >
                    {otpSent ? 'Resend (52s)' : 'Get OTP'}
                  </button>
                </div>
                {otpSent && (
                  <p className="text-[11px] text-emerald-700 mt-1.5 flex items-center gap-1 font-medium">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    OTP sent to registered mobile ending in ···4109
                  </p>
                )}
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-neutral-700">Account Password</label>
                  <a href="#forgot" onClick={(e) => e.preventDefault()} className="text-[11px] text-neutral-500 hover:text-black hover:underline">
                    Forgot Password?
                  </a>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={consumerPassword}
                    onChange={(e) => setConsumerPassword(e.target.value)}
                    placeholder="Enter password"
                    required
                    className="w-full pl-10 pr-10 py-2.5 rounded-full border border-neutral-300 text-sm font-medium text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-neutral-400 hover:text-neutral-700"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            )}

            {/* Consumer Primary CTA */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-6 rounded-full bg-[#09090B] hover:bg-neutral-800 text-white font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-soft-md hover:shadow-lg active:scale-98 disabled:opacity-50 mt-2"
            >
              <span>{isLoading ? 'Verifying Credentials...' : 'Continue as Consumer'}</span>
              <ArrowRight className="w-4 h-4 text-[#D2F843]" />
            </button>

            {/* Consumer Help Links */}
            <div className="flex items-center justify-between text-xs text-neutral-500 pt-2 border-t border-neutral-100">
              <a href="#forgotId" onClick={(e) => e.preventDefault()} className="hover:text-black hover:underline">
                Forgot Consumer ID?
              </a>
              <a href="#newConnection" onClick={(e) => e.preventDefault()} className="hover:text-black font-semibold hover:underline">
                New LT Connection? Register here
              </a>
            </div>
          </div>
        )}

        {/* ================= ROLE 2: OFFICER LOGIN ================= */}
        {role === 'officer' && (
          <div className="space-y-4 animate-fade-in">
            {/* Officer Email / Employee ID */}
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                Official Employee ID / Work Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  value={officerEmail}
                  onChange={(e) => setOfficerEmail(e.target.value)}
                  placeholder="e.g. s.more@msedcl.gov.in"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-full border border-neutral-300 text-sm font-medium text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10 font-mono transition-all"
                />
              </div>
            </div>

            {/* Officer Password */}
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                Staff Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={officerPassword}
                  onChange={(e) => setOfficerPassword(e.target.value)}
                  placeholder="Enter employee password"
                  required
                  className="w-full pl-10 pr-10 py-2.5 rounded-full border border-neutral-300 text-sm font-medium text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-neutral-400 hover:text-neutral-700"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Substation / Division Code selection */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-neutral-700">
                  Substation / Division Assigned
                </label>
                <span className="text-[11px] text-neutral-400">Auto-filled via HRMS</span>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                  <Building2 className="w-4 h-4" />
                </div>
                <select
                  value={substationCode}
                  onChange={(e) => setSubstationCode(e.target.value)}
                  className="w-full pl-10 pr-8 py-2.5 rounded-full border border-neutral-300 text-xs sm:text-sm font-medium text-neutral-900 bg-white focus:outline-none focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10 transition-all cursor-pointer"
                >
                  {SUBSTATIONS_LIST.map((sub, idx) => (
                    <option key={idx} value={sub}>{sub}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Officer Primary CTA */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-6 rounded-full bg-[#09090B] hover:bg-neutral-800 text-white font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-soft-md hover:shadow-lg active:scale-98 disabled:opacity-50 mt-2"
            >
              <span>{isLoading ? 'Validating Department Access...' : 'Access Officer Portal'}</span>
              <ArrowRight className="w-4 h-4 text-[#D2F843]" />
            </button>

            <div className="text-center text-xs text-neutral-500 pt-1">
              <span>MSEDCL Intranet & SCADA authorized personnel only</span>
            </div>
          </div>
        )}

        {/* ================= ROLE 3: ADMIN LOGIN ================= */}
        {role === 'admin' && (
          <div className="space-y-4 animate-fade-in">
            {/* Admin Username */}
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                Superuser Admin Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={adminUsername}
                  onChange={(e) => setAdminUsername(e.target.value)}
                  placeholder="e.g. superadmin_msceb"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-full border border-neutral-300 text-sm font-medium text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10 font-mono transition-all"
                />
              </div>
            </div>

            {/* Admin Password */}
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                Master Security Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="Master authorization key"
                  required
                  className="w-full pl-10 pr-10 py-2.5 rounded-full border border-neutral-300 text-sm font-medium text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-neutral-400 hover:text-neutral-700"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Security Token / 2FA field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-neutral-700">
                  Security Token / Hardware 2FA Key
                </label>
                <span className="text-[11px] text-amber-700 font-semibold bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                  Required 2FA
                </span>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                  <KeyRound className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={securityToken}
                  onChange={(e) => setSecurityToken(e.target.value)}
                  placeholder="e.g. MSCEB-SEC-7749"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-full border border-neutral-300 text-sm font-medium text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10 font-mono transition-all"
                />
              </div>
            </div>

            {/* Admin Primary CTA */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-6 rounded-full bg-[#09090B] hover:bg-neutral-800 text-white font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-soft-md hover:shadow-lg active:scale-98 disabled:opacity-50 mt-2"
            >
              <span>{isLoading ? 'Verifying 2FA Token...' : 'Login to Admin Console'}</span>
              <Shield className="w-4 h-4 text-[#D2F843]" />
            </button>

            <div className="text-center text-xs text-neutral-500 pt-1">
              <span>All administrative actions are cryptographically logged & audited</span>
            </div>
          </div>
        )}

      </form>
    </div>
  );

  // If dedicated view mode: render as full page with background
  if (isDedicatedView) {
    return (
      <div className="min-h-[85vh] py-12 px-4 flex flex-col items-center justify-center bg-grid-pattern relative">
        <div className="w-full max-w-lg">
          {content}
        </div>
      </div>
    );
  }

  // Modal mode: render centered card with diffused backdrop blur
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-neutral-900/50 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />
      
      {/* Centered Card */}
      <div className="relative z-10 w-full my-auto animate-slide-up">
        {content}
      </div>
    </div>
  );
}
