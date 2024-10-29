import {useTranslation} from "react-i18next";

const TodoListView = () => {
    const {t} = useTranslation();
    return (
        <section className="p-3 h-full">
            <div className="bg-white p-3 rounded-lg h-full shadow-sm flex flex-col gap-1">
                <h2>{t('title.to-do-list')}</h2>
            </div>
        </section>
    )
}

export default TodoListView