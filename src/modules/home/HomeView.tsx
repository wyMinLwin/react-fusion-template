import { Button } from "@/components/ui/button";
import i18next from "i18next";
import { useTranslation } from "react-i18next";

const HomeView = () => {
	const { t } = useTranslation();
	const changeLanguage = (lng: string) => {
		i18next.changeLanguage(lng);
	};
	return (
		<div>
			<h1 className="">Template: React-std</h1>
			<p>Tech Stack: React + Shadcn UI</p>
			<p>{t("common.hello")}</p>
			<div className="flex gap-2">
				<Button onClick={() => changeLanguage("en")}>English</Button>
				<Button onClick={() => changeLanguage("mm")}>Myanmar</Button>
			</div>
		</div>
	);
};

export default HomeView;
