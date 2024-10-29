import {sidebarData} from "@/components/sidebar/sidebarData.ts";
import {useTranslation} from "react-i18next";

const DesktopSidebar = () => {

    const {t} = useTranslation()
    
    return <aside className={'lg:flex flex-col hidden min-h-svh min-w-[220px] lg:min-w-[240px] bg-white h-full'}>
        <div className="flex flex-col items-center justify-center h-20">
            <h5 className="text-xl font-bold leading-4 cursor-pointer">
                {t('common.dashboard')} <span className="text-[8px]">v.01</span>
            </h5>
            <h4
                className="text-[10px] leading-[0.75] font-bold tracking-normal cursor-pointer"
            >
                <b className="text-[#f9b223] font-semibold"> FUSION </b>
                SOLUTION
            </h4>
        </div>
        <ul className={'px-3'}>
            {
                sidebarData.map((item) =>
                    <li key={item.name} className={"hover:bg-accent flex items-center justify-between p-2 mb-3 rounded-sm cursor-pointer"}>
                        <div className={'flex items-center gap-3'}>
                            {item.icon && <item.icon className="w-4 h-4" /> }
                            <p className={"text-[13px]"}>{t(item.name)}</p>
                        </div>
                    </li>)
            }
        </ul>
    </aside>
}
export default DesktopSidebar