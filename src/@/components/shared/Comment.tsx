import { Models } from "appwrite";
import { Input } from "../ui/input"
import { useToast } from "../ui/use-toast";
import { useUserContext } from "@/context/AuthContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { CommentValidation } from "@/@/lib/validation";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { useCommentPost} from "@/@/lib/react-query/queriesAndMutations";
import { z } from "zod";
import { useForm } from "react-hook-form";
import Loader from "./Loader";
//import { Button } from "../ui/button";


type CommentsFormProps = {
    comments?: Models.Document;
    post?:Models.Document;
    action: "Create";
};

const Comment = ({ comments,post, action }: CommentsFormProps) => {
    const { toast } = useToast();
    const { user } = useUserContext();
    const form = useForm<z.infer<typeof CommentValidation>>({
        resolver: zodResolver(CommentValidation),
        defaultValues: {
            comment: comments ? comments.comment : "",
            imageId: "",
        },
    });
    const { mutateAsync: commentPost, isPending: isLoadingCreate } =
        useCommentPost();
    const handleComment = async (value: z.infer<typeof CommentValidation>) => {
        // ACTION = CREATE
        const newComment = await commentPost({
            ...value,
            userId: user?.id || "", 
            postId: post?.$id || "", 
            imageId: value.imageId || "", // Correctly access imageId

        });
        

        if (!newComment) {
            toast({
                title: `${action} post failed. Please try again.`,
            });
        }console.log(newComment)
    };




    return (
        <>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleComment)}
                    className="flex flex-1 gap-3  max-w-5xl">

                    <FormField
                        control={form.control}
                        name="comment"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input type="text" className="shad-input w-89 " {...field} placeholder="Comment here..." />
                                    
                                </FormControl>
                                <FormMessage className="shad-form_message" />
                            </FormItem>
                        )}
                    />
                    <button
                        type="submit"
                        disabled={isLoadingCreate} className="w-5 h-5 mt-3" >
                        {(isLoadingCreate) && <Loader />}
                         <img src="/assets/icons/send.png" width={20} height={20}  className="cursor-pointer" />
                    </button>
                </form>
            </Form>
        </>
    )

}

export default Comment