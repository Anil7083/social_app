import { Models } from "appwrite";
import { useState } from "react";

type CommentCardProps = {
    post: Models.Document;
};

const DisplayComments = ({ post }: CommentCardProps) => {
    const [clickComment, setClickComment] = useState(false);

    const getComment = Array.isArray(post?.comments)
        ? post.comments.map((comment: Models.Document) => ({
            comment: comment.comments,
            comUser: {
                name: comment.comUser.name,
                imageUrl: comment.comUser.imageUrl,
            },
        })).reverse()
        : [];

    const viewComment = () => {
        return setClickComment(prevState => !prevState);
    }
    return (
        <>
            <div onClick={viewComment} className="cursor-pointer">
                {clickComment ? <h1 className="ml-4 mt-3 text-slate-500 items-end">^^ less comments</h1>:
                <h1 className="ml-4 mt-3 text-slate-500 ">view comments..{getComment.length}s</h1>
                }
            </div>


            {clickComment && (
                <div className="flex-coll items-center mt-3">
                    {getComment.map((post, index) => (
                        <div key={index} className="border-solid border-2 border-indigo-600 rounded-xl mb-1 ">
                            <div className="flex ml-2">
                                <img src={post.comUser.imageUrl} alt="comUser" className="w-10 rounded-full mt-2 mb-1 " />
                                <h1 className="pt-2 ml-2 text-gray-500">{post.comUser.name}</h1>
                            </div>
                            <p className="ml-14 -mt-5 font-medium text-slate-200">{post.comment}</p>

                        </div>
                    ))}
                </div>
            )}

        </>

    );
};

export default DisplayComments;
