import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-background text-gray-300 dark:text-muted-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">
              About EduRecruitment
            </h3>
            <p className="text-gray-400">
              Leading the way in educational recruitment with expert instructors and
              comprehensive courses. Join us in shaping the future of education.
            </p>
          </div>

          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/">
                  <a className="hover:text-white transition-colors">Home</a>
                </Link>
              </li>
              <li>
                <Link href="/services">
                  <a className="hover:text-white transition-colors">Services</a>
                </Link>
              </li>
              <li>
                <Link href="/courses">
                  <a className="hover:text-white transition-colors">Courses</a>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <a className="hover:text-white transition-colors">About Us</a>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <a className="hover:text-white transition-colors">Contact Us</a>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-2 text-gray-400">
              <li>📍 316e, Ilford Lane, Room 8C</li>
              <li>   Ilford, IG1 2LT</li>
              <li>📞 203 9300 985</li>
              <li>📱 07732793920</li>
              <li>📱 07506 915782</li>
              <li>✉️ info@edurecruitment.org</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} EduRecruitment. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}