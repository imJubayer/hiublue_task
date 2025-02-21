import Axios from "axios";

// const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
const baseURL = "https://dummy-1.hiublue.com/api";

const axios = Axios.create({
	headers: {
		"Content-Type": "application/json",
	},
	baseURL: baseURL,
});

// Function to retrieve the JWT token from cookies
const getJwtToken = () => {
	const cookies = document.cookie.split("; ");
	for (const cookie of cookies) {
		const [name, value] = cookie.split("=");
		if (name === "JWT_TOKEN") {
			return value;
		}
	}
	return null;
};

// Add an interceptor to set the Authorization header with the JWT token
axios.interceptors.request.use((config) => {
	// const jwtToken = getJwtToken();
	const token = localStorage.getItem("token");
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

export default axios;
