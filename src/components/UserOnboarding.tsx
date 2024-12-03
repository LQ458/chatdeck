import { useEffect, useState } from "react";
import { Steps } from "intro.js-react";
import "intro.js/introjs.css";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";

interface Step {
  element: string;
  intro: string;
  position?: string;
}

export const UserOnboarding = () => {
  const { user, updateUser } = useAuth();
  const [enabled, setEnabled] = useState(false);

  const steps: Step[] = [
    {
      element: "#nav-home",
      intro: "这是主页，你可以在这里看到最新动态",
      position: "bottom",
    },
    {
      element: "#theme-toggle-btn",
      intro: "点击这里可以切换明暗主题",
      position: "bottom",
    },
    {
      element: "#color-scheme-select",
      intro: "选择你喜欢的颜色主题",
      position: "bottom",
    },
    {
      element: "#chat-container",
      intro: "这是聊天区域，你可以在这里与其他用户交流",
      position: "left",
    },
    {
      element: "#online-users",
      intro: "这里显示当前在线的用户",
      position: "right",
    },
    {
      element: "#message-input",
      intro: "在这里输入要发送的消息",
      position: "top",
    },
    {
      element: "#user-settings",
      intro: "在这里可以修改你的个人设置",
      position: "left",
    },
  ];

  useEffect(() => {
    if (user?.isNewUser) {
      setEnabled(true);
    }
  }, [user]);

  const onExit = async () => {
    setEnabled(false);
    if (user?.id) {
      try {
        await axios.patch(`/api/users/${user.id}`, {
          isNewUser: false,
        });
        updateUser({ ...user, isNewUser: false });
      } catch (error) {
        console.error("Failed to update user status:", error);
      }
    }
  };

  return (
    <Steps
      enabled={enabled}
      steps={steps}
      initialStep={0}
      onExit={onExit}
      options={{
        doneLabel: "完成",
        nextLabel: "下一步",
        prevLabel: "上一步",
        exitOnOverlayClick: false,
        showStepNumbers: true,
        scrollToElement: true,
      }}
    />
  );
};
