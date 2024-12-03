import { useEffect, useState } from "react";
import { Steps } from "intro.js-react";
import "intro.js/introjs.css";
import { useTourStore } from "../store/useTourStore";
interface Step {
  element: string;
  intro: string;
  position?: string;
}

export const UserOnboarding = () => {
  const [enabled, setEnabled] = useState(false);
  const { showTour, setShowTour } = useTourStore();

  const steps: Step[] = [
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
  ];

  useEffect(() => {
    if (showTour) {
      setEnabled(true);
    }
  }, [showTour]);

  const onExit = async () => {
    setEnabled(false);
    setShowTour(false);
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
