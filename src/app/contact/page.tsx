import { ContactForm } from './contact-form';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">Contact Us</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            We are here to help and answer any question you might have.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-8">
          <div className="flex flex-col items-center justify-center">
             <ContactForm />
          </div>

          <div className="flex flex-col justify-center space-y-8">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-md bg-accent text-accent-foreground">
                  <Mail className="h-6 w-6" />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-primary">Email</h3>
                <a href="mailto:rehobothfa@gmail.com" className="text-base font-medium text-primary hover:text-accent">
                  rehobothfa@gmail.com
                </a>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-md bg-accent text-accent-foreground">
                  <Phone className="h-6 w-6" />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-primary">Phone</h3>
                <a href="tel:07949235754" className="text-base font-medium text-primary hover:text-accent">
                  07949235754
                </a>
              </div>
            </div>
             <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-md bg-accent text-accent-foreground">
                  <MapPin className="h-6 w-6" />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-primary">Address</h3>
                <p className="mt-1 text-muted-foreground">Holy Trinity Church Hall</p>
                <p className="text-muted-foreground">Clarence Way. Kentish Town</p>
                <p className="text-muted-foreground">NW1 8HR</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
