import { useEffect } from "react";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { useAuth } from "../hooks/useAuth";

export function UserOnboarding() {
  const { user } = useAuth();

  useEffect(() => {
    if (!user?.isNewUser) return;

    const driverObj = driver({
      showProgress: true,
      steps: [
        {
          element: "#create-room-btn",
          popover: {
            title: "Create Private Rooms",
            description:
              "Start your own private chat room and invite others to join.",
            side: "bottom",
          },
        },
        {
          element: "#debate-room-btn",
          popover: {
            title: "Debate Rooms",
            description:
              "Create structured debate rooms with teams and topics.",
            side: "bottom",
          },
        },
        {
          element: "#join-code-btn",
          popover: {
            title: "Join by Code",
            description: "Enter a room code to join existing conversations.",
            side: "bottom",
          },
        },
        {
          element: "#theme-toggle",
          popover: {
            title: "Customize Your Experience",
            description:
              "Switch between light and dark modes, or choose your preferred color scheme.",
            side: "bottom",
          },
        },
      ],
    });

    driverObj.drive();

    return () => {
      driverObj.destroy();
    };
  }, [user]);

  return null;
}
