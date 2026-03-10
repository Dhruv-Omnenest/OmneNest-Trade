import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import  {LoginPage}  from "../pages/LoginPage";
import { useAuthStore } from "@/store/auth.store";
import { useUIStore } from "@/store/ui.store";
import { loginUser, validateOtp } from "@/services/api/auth/AuthService";
jest.mock("@/services/api/auth/AuthService");
jest.mock("@/store/auth.store");
jest.mock("@/store/ui.store");

describe("LoginPage Production Workflow", () => {
  const mockSetPasswordSuccess = jest.fn();
  const mockSetLoginSuccess = jest.fn();  
  const mockPushNotification = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useUIStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({ pushNotification: mockPushNotification })
    );
  });
  test("authenticates user with password and transitions to OTP", async () => {
    (useAuthStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({
        isPasswordDone: false,
        setPasswordSuccess: mockSetPasswordSuccess,
      })
    );

    (loginUser as jest.Mock).mockResolvedValue({ status: "success", data: {} });

    render(<LoginPage />);

    const userField = screen.getByPlaceholderText("USERNAME");
    const passField = screen.getByPlaceholderText("PASSWORD");
    const loginBtn = screen.getByText("VERIFY PASSWORD");

    // Input credentials
    fireEvent.change(userField, { target: { value: "AMITH1" } });
    fireEvent.change(passField, { target: { value: "PROD_SECRET_123" } });
    fireEvent.click(loginBtn);

    expect(loginBtn).toHaveTextContent("AUTHENTICATING...");
    
    await waitFor(() => {
      expect(loginUser).toHaveBeenCalledWith("AMITH1", "PROD_SECRET_123");
      expect(mockSetPasswordSuccess).toHaveBeenCalled();
      expect(mockPushNotification).toHaveBeenCalledWith(
        "Password Verified. Enter OTP",
        "success"
      );
    });
  });

  test("validates OTP and grants access", async () => {
    (useAuthStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({
        isPasswordDone: true,
        setLoginSuccess: mockSetLoginSuccess,
      })
    );

    (validateOtp as jest.Mock).mockResolvedValue({ token: "JWT_PROD_TOKEN" });

    render(<LoginPage />);
    expect(screen.getByText("OPERATOR AUTH")).toBeInTheDocument();
    
    const otpField = screen.getByPlaceholderText("ENTER OTP");
    const verifyBtn = screen.getByText("VERIFY SESSION");
    fireEvent.change(otpField, { target: { value: "1234" } });
    fireEvent.click(verifyBtn);

    await waitFor(() => {
      expect(validateOtp).toHaveBeenCalledWith("AMITH1", 1234);
      expect(mockSetLoginSuccess).toHaveBeenCalledWith({ token: "JWT_PROD_TOKEN" });
      expect(mockPushNotification).toHaveBeenCalledWith("Access Granted", "success");
    });
  });

  test("shows error when empty credentials are submitted", () => {
    (useAuthStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({ isPasswordDone: false })
    );

    render(<LoginPage />);
    
    fireEvent.change(screen.getByPlaceholderText("USERNAME"), { target: { value: "" } });
    fireEvent.click(screen.getByText("VERIFY PASSWORD"));

    expect(mockPushNotification).toHaveBeenCalledWith(
      "Please enter both credentials",
      "error"
    );
  });
});