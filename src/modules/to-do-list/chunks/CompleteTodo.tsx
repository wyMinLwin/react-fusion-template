import {ReactNode, useState} from "react";
import {TodoType} from "@/shared/types";
import {Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {useAppDispatch} from "@/store";
import {hideLoader, openLoader} from "@/store/features/loaderSlice.ts";
import {useToast} from "@/hooks/use-toast.ts";
import api from "@/api";

type CompleteTodoProps = {
    children: ReactNode,
    todo: TodoType
}
const CompleteTodo = ({children, todo}: CompleteTodoProps) => {
    const dispatch = useAppDispatch();
    const {toast} = useToast();

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const {mutate: completeTodo} = api.todo.updateTodo.useMutation({
        onMutate: () => {
            dispatch(openLoader())
        },
        onError: () => toast({title: "Error", description: "Error while completing todo", variant: "destructive"}),
        onSettled: () => {
            setIsDialogOpen(false);
            dispatch(hideLoader())
        },
    })

    const completeTodoHandler = async () => {
        completeTodo({...todo, status: 'Completed'})
    }
    return (
        <Dialog open={isDialogOpen} onOpenChange={(e) => setIsDialogOpen((e))}>
            <DialogTrigger asChild={true}>
                {children}
            </DialogTrigger>
            <DialogContent className={'w-[95vw] sm:w-[400px] max-w-[400px]'}>
                <DialogHeader>
                    <DialogTitle>Complete Todo</DialogTitle>
                </DialogHeader>
                <div className="">
                    <p className={'text-center text-pretty text-sm'}>Are you sure you want to complete this todo?</p>
                    <div className="flex justify-end gap-3 mt-3">
                        <Button className={'w-full'} onClick={() => setIsDialogOpen(false)}
                                variant={'destructive'}>Cancel</Button>
                        <Button className={'w-full'} onClick={() => completeTodoHandler()}>Complete</Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default CompleteTodo;