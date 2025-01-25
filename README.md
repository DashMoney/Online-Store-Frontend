# DashGetPaid (Online Store) Frontend

**This is a short description of how someone would operate a Dash Platform Frontend.**

1. Copy this github repository to your own github account. https://github.com/DashMoney/Online-Store-Frontend
2. Connect copied Github repository to hosting service (Vercel - I use Hobby-free edition).
3. Add environment variables and domain name to hosting service.
   • See Below\*
4. Hosting service builds and deploys. (You are now a Dash Platform Frontend Entrepreneur.)

\*These are the environmental variable that you need to create for operation:

- VITE_FRONTEND_NAME = DashGetPaid
- VITE_MERCHANT_NAME= (Your Dash Name)
- VITE_MERCHANT_IDENTITY = (This is your Dash IdentityID)
- VITE_BKGD = primary
- VITE_NETWORK = testnet

Frontend Name is what will appear in the top of page navigation bar.

Merchant Name is the Dash name associated with the Merchant Identity.

Merchant Identity can be found on your Account Login page

BKGD is 'Background' which can be 'dark' or 'primary' (without quotes)

NETWORK can be 'testnet' or 'mainnet' (without quotes)

### React + Vite (Everything else is from initial Vite setup)

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
