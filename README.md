## **Overview**

First of all, congratulations on being shortlisted for the Frontend Developer position at hiublue! 🎉 As part of the selection process, we have designed a challenge to assess your skills in **Next.js, TypeScript, MUI, API handling, code structure and frontend architecture**.

You will be provided with a **starter repository** that includes the basic project setup. Your task is to build a functional admin portal with authentication, data visualization on dashboard, basic onboarding offer functionality while integrating API.

We are providing:

- [**Figma design link**](https://www.figma.com/design/p4aO5zxiLUkws5DDTTWP92/Untitled?node-id=0-1&t=oePPLG5LIUguMtQy-1)
- [**Postman collection**](https://documenter.getpostman.com/view/8605001/2sAYXFiHWQ)

## **Tech Stack**

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **UI Library:** Material UI (MUI)
- **Form Handling:** React Hook Form (Use validation like yup or zod)
- **Charting:** ApexCharts
- **State Management:** Context API and LocalStorage
- **Version Control:** GitHub (Fork the repo and maintain clean commits)
- **Deployment:** Vercel

## **Requirements**

### **1. Authentication**

- A login page will be already there, you have to implement the api first.
- Store authentication state using **Context API and LocalStorage**.
- Make sure no unauthorized user has access to the dashboard or any other routes.
- Show different layouts for **authenticated vs. non-authenticated users**.

### **2. Admin Dashboard**

- Fetch **real-time data** from the provided API.
- Display the data in an table with:
  - Pagination
  - Searching
  - Filtering
- Show **charts** based on API data using **ApexCharts**.

### **3. Sending Onboarding Offer**

- Implement a **separate page** where the admin can send onboarding offers to new users.
- Allow the admin to **select a user** from a list and fill in additional fields. Do use Mui Autocomplete component. Instead of pulling all users, perform searching using api.
- Using **React Hook Form** is preferred but not mandatory.
- Validate the data before submitting using packages like yup and zod.

### **4. Git & Code Structure**

- Follow a **clean Git workflow** (feature branches, meaningful commit messages).
- Write **modular, reusable, and well-structured** code.
- Ensure **proper TypeScript typings** throughout the project.

### **5. Responsive design**

- The application should be responsive, adapting seamlessly to different screen sizes without compromising or design integrity.

### **6. Readme File**

- Include a **README** file that provides clear instructions on how to set up, run and test the application

### **7. Deployment**

- **Deploy the project to Vercel** and provide the link.

## **How to Start**

1. **Fork the starter repository** (link will be provided).
2. Clone your fork and install dependencies:

```bash
git clone YOUR_FORKED_REPO
cd YOUR_PROJECT
npm install
```

1. Once completed, **push your changes.**

## **Submission Requirements**

- **GitHub Repository Link** (structured with a README file).
- **Live Deployment Link**

## **Evaluation Criteria**

| **Category** | **Evaluation Criteria** |
| --- | --- |
| **Code Quality** | Readability, structure, component-based approach |
| **TypeScript Usage** | Proper typing of components, hooks, data types, API responses |
| **API Handling** | Proper usage of necessary caching, error handling |
| **UI & UX** | Clean UI, responsiveness, MUI usage, adherence to Figma design. Using MUI is a must. |
| **Authentication** | Token-based authentication, proper auth state management using Context API & LocalStorage |
| **Table Features** | Proper implementation of pagination, searching using. |
| **Form Handling** | Correct usage of React Hook Form and proper validation |
| **Onboarding Offer** | Ability to select users, send onboarding requests |
| **Error & Success Messages** | Proper display of validation errors and success messages |
| **Git Practices** | Clean commits, meaningful messages, proper branching |

## **Deadline**

You have **4 days** to complete this challenge.

Good luck!