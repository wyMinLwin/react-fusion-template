import {Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {ReactNode, useState} from "react";
import {z} from "zod"
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    Form, FormControl, FormField, FormItem, FormLabel, FormMessage
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button.tsx";
import {TodoType} from "@/shared/types";
import api from "@/api";
import {toast} from "@/hooks/use-toast.ts";
import {useAppDispatch} from "@/store";
import {openLoader, hideLoader} from "@/store/features/loaderSlice.ts";

const formSchema = z.object({
    title: z.string({required_error: "Title is required!"}).min(3, {message: "Title must be at least 3 characters long!"}),
    description: z.string({required_error: "Description is required!"}).min(3, {message: "Description must be at least 3 characters long!"}),
    status: z.enum(['In Progress', 'Completed', 'Not Started'], {required_error: "Status is required!"})
})

type TodoCreateUpdateDialogProps = {
    children: ReactNode,
    isEdit: boolean
    editPayload?: TodoType
}


const TodoCreateUpdateDialog = (
    {children, isEdit, editPayload}: TodoCreateUpdateDialogProps) => {

    const dispatch = useAppDispatch();
    const {mutate:addTodo} = api.todo.addTodo.useMutation({
        onMutate: () => {
            dispatch(openLoader())
        },
        onError: () => toast({title: "Error", description: "Error while adding todo", variant: "destructive"}),
        onSettled: () => {
            setIsDialogOpen(false);
            form.reset();
            dispatch(hideLoader())

        },
    })

    const {mutate:updateTodo} = api.todo.updateTodo.useMutation({
        onMutate: () => {
            dispatch(openLoader())
        },
        onError: () => toast({title: "Error", description: "Error while adding todo", variant: "destructive"}),
        onSettled: () => {
            setIsDialogOpen(false);
            form.reset();
            dispatch(hideLoader())

        },
    })

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: isEdit ? editPayload?.title : '',
            description: isEdit ? editPayload?.description : '',
            status: isEdit ? editPayload?.status : 'Not Started',
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        // console.log(values)
        if (isEdit && editPayload) {
            updateTodo(Object.assign(editPayload, values) as TodoType)
        } else {
            addTodo(values)
        }
    }

    return (
        <Dialog open={isDialogOpen} onOpenChange={(e) => setIsDialogOpen(e)}>
            <DialogTrigger asChild={true}>
                {children}
            </DialogTrigger>
            <DialogContent className={'w-[95vw] sm:w-[400px] max-w-[400px]'}>
                <DialogHeader>
                    <DialogTitle>
                        {isEdit ? 'Edit Todo' : 'Create Todo'}
                    </DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="title"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter title..." {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter description..." {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="status"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Status</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select A Status"/>
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Not Started">Not Started</SelectItem>
                                            <SelectItem value="In Progress">In Progress</SelectItem>
                                            <SelectItem value="Completed">Completed</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <div className={'flex justify-between items-center mt-4 gap-3'}>
                            <Button className={'w-full'} type={'button'} variant={'destructive'}
                                    onClick={() => setIsDialogOpen(false)}> Close </Button>
                            <Button className={'w-full'} type={'submit'}>Save</Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default TodoCreateUpdateDialog;