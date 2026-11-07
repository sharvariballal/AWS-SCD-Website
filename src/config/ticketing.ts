/**
 * Ticketing Configuration for AWS Student Community Day 2027 (Cloud City)
 * 
 * To connect your KonfHub ticketing page:
 * 1. Set `provider` to 'konfhub'
 * 2. Paste your live KonfHub event page URL into `konfhubEventUrl`
 * 3. All "Claim Pass" and "Book Ticket" buttons will instantly redirect users to your KonfHub checkout!
 */

export interface TicketingConfig {
  provider: 'konfhub' | 'modal';
  konfhubEventUrl: string;
  supportEmail: string;
}

export const TICKETING_CONFIG: TicketingConfig = {
  // 'konfhub' = Redirects to KonfHub ticketing portal
  // 'modal'   = Opens the internal student verification registration modal
  provider: 'konfhub',
  
  // Replace this with your exact KonfHub event URL when live
  konfhubEventUrl: 'https://konfhub.com/aws-scd-pune-2027',

  supportEmail: 'support@aws-sbg-pict.in',
};
