import Link from "next/link";
import {
  Hospital,
  MapPin,
  Phone,
  Mail,
  Clock,
  ChevronRight,
  Heart,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t-4 border-emerald-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          {/* Column 1: About & Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="bg-emerald-600 text-white p-2.5 rounded-xl shadow-md group-hover:bg-emerald-500 transition-colors">
                <Hospital className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-white block">
                  Allahmalik<span className="text-emerald-500">.</span>
                </span>
                <span className="text-xs font-medium text-emerald-400 tracking-wider uppercase block">
                  Hospital & Diagnostic
                </span>
              </div>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              আল্লাহ মালিক হাসপাতাল ও ডায়াগনস্টিক সেন্টারে আপনাকে স্বাগতম। আমরা ২৪ ঘণ্টা অভিজ্ঞ ডাক্তার ও আধুনিক প্রযুক্তির মাধ্যমে বরগুনায় উন্নত চিকিৎসা সেবা প্রদান করে থাকি।
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-800/50">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                24/7 Emergency Active
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-white text-base font-semibold border-b border-slate-800 pb-2 inline-block">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { name: "Home", href: "/" },
                { name: "Our Doctors", href: "/doctors" },
                { name: "Medical Departments", href: "/departments" },
                { name: "About Us", href: "/about" },
                { name: "Contact & Location", href: "/contact" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center gap-1.5 hover:text-emerald-400 hover:translate-x-1 transition-all"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-emerald-500" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Medical Services */}
          <div className="space-y-4">
            <h3 className="text-white text-base font-semibold border-b border-slate-800 pb-2 inline-block">
              Our Services
            </h3>
            <ul className="space-y-2.5 text-sm">
              {[
                "Modern Pathology Lab",
                "Digital X-Ray & ECG",
                "Cardiology & Heart Care",
                "Gynecology & Surgery",
                "Pediatric Consultation",
                "24/7 Emergency Medicine",
              ].map((service) => (
                <li key={service} className="flex items-center gap-1.5 text-slate-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Information */}
          <div className="space-y-4">
            <h3 className="text-white text-base font-semibold border-b border-slate-800 pb-2 inline-block">
              Emergency Contact
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <span>Hospital Road, Barguna Sadar, Barguna</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-emerald-500 shrink-0" />
                <a href="tel:+8801700000000" className="hover:text-emerald-400 transition-colors">
                  +880 1700-000000
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-emerald-500 shrink-0" />
                <a href="mailto:info@allahmalikhospital.com" className="hover:text-emerald-400 transition-colors">
                  info@allahmalikhospital.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <span>Open 24 Hours / 7 Days a Week</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Rights */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {currentYear} Allahmalik Hospital & Diagnostic Center. All Rights Reserved.</p>
          <p className="flex items-center gap-1">
            Carefully Designed & Built with <Heart className="w-3.5 h-3.5 text-emerald-500 fill-emerald-500" /> for Better Healthcare.
          </p>
        </div>

      </div>
    </footer>
  );
}