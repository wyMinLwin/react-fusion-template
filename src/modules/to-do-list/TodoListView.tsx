import {useTranslation} from "react-i18next";
import {Tabs, TabsList, TabsContent, TabsTrigger} from "@/components/ui/tabs";
import api from "@/api";
import {useToast} from "@/hooks/use-toast.ts";
import {Card} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import TodoCreateUpdateDialog from "@/modules/to-do-list/chunks/TodoCreateUpdateDialog.tsx";
import CompleteTodo from "@/modules/to-do-list/chunks/CompleteTodo.tsx";


const TodoListView = () => {
    const {t} = useTranslation();
    const {toast} = useToast();
    const {data} = api.todo.getAllTodos.useQuery({
        notifyOnChangeProps: "all"
    }, () => {
        toast({
            title: "Error",
            description: "Error while fetching todos",
            variant: "destructive",
        })
    });

    return (
        <section className="p-3 h-full">
            <div className="bg-white p-3 rounded-lg h-full shadow-sm flex flex-col gap-1">
                <div className={'flex justify-between items-center'}>
                    <h2>{t('title.to-do-list')}</h2>
                    <TodoCreateUpdateDialog isEdit={false}>
                        <Button>Add Todo</Button>
                    </TodoCreateUpdateDialog>
                </div>
                <Tabs defaultValue={'Not Started'}>
                    <TabsList>
                        <TabsTrigger value="Not Started">Not Started</TabsTrigger>
                        <TabsTrigger value="In Progress">In Progress</TabsTrigger>
                        <TabsTrigger value="Completed">Completed</TabsTrigger>
                    </TabsList>

                    <TabsContent value={'Not Started'}>
                        <div
                            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 w-full gap-2"
                        >
                            {
                                data?.map((todo) => (

                                    todo.status === "Not Started" &&
                                    <Card
                                        key={todo.id}
                                        className="w-full p-3 shadow-[#00000011] h-fit"
                                    >
                                        <div className={"w-full text-nowrap text-ellipsis overflow-hidden"}>
                                            {todo.title}
                                        </div>
                                        <div className={'text-sm'}>{todo.description}</div>
                                        <div className="flex flex-col gap-1.5 mt-2">
                                            <TodoCreateUpdateDialog isEdit={true} editPayload={todo}>
                                                <Button
                                                    variant="outline"> Edit </Button>
                                            </TodoCreateUpdateDialog>
                                            <CompleteTodo todo={todo}>
                                                <Button> Complete </Button>
                                            </CompleteTodo>
                                        </div>
                                    </Card>

                                ))
                            }
                        </div>
                    </TabsContent>
                    <TabsContent value={'In Progress'}>
                        <div
                            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 w-full gap-2"
                        >
                            {
                                data?.map((todo) => (

                                    todo.status === "In Progress" &&
                                    <Card
                                        key={todo.id}
                                        className="w-full p-3 shadow-[#00000011] h-fit"
                                    >
                                        <div className={"w-full text-nowrap text-ellipsis overflow-hidden"}>
                                            {todo.title}
                                        </div>
                                        <div className={'text-sm'}>{todo.description}</div>
                                        <div className="flex flex-col gap-1.5 mt-2">
                                            <TodoCreateUpdateDialog isEdit={true} editPayload={todo}>
                                                <Button
                                                    variant="outline"> Edit </Button>
                                            </TodoCreateUpdateDialog>
                                            <CompleteTodo todo={todo}>
                                                <Button> Complete </Button>
                                            </CompleteTodo>
                                        </div>
                                    </Card>

                                ))
                            }
                        </div>
                    </TabsContent>
                    <TabsContent value={'Completed'}>
                        <div
                            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 w-full gap-2"
                        >
                            {
                                data?.map((todo) => (

                                    todo.status === "Completed" &&
                                    <Card
                                        key={todo.id}
                                        className="w-full p-3 shadow-[#00000011] h-fit"
                                    >
                                        <div className={"w-full text-nowrap text-ellipsis overflow-hidden"}>
                                            {todo.title}
                                        </div>
                                        <div className={'text-sm'}>{todo.description}</div>
                                        <div className="flex flex-col gap-1.5 mt-2">
                                            <Button disabled={true}
                                                    variant="outline"> Edit </Button>
                                            <Button disabled={true}> Complete </Button>
                                        </div>
                                    </Card>

                                ))
                            }
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </section>
    )
}

export default TodoListView