import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { removeLike, addLike, removeRePost, addRePost } from "../core/actions/PostsActions";
import { useReduxState } from "../core/Store";
import { IPostDto, LikesClient, RePostsClient } from "../core/WebApiClient";
import { faComment, faHeart } from "@fortawesome/free-regular-svg-icons";
import { faRetweet, faShareSquare } from "@fortawesome/free-solid-svg-icons";
import PostButton from "./PostButton";
import PostFormModal from "./PostFormModal";

interface PostButtonRowProps {
    post: IPostDto,
    large?: boolean,
}

const PostButtonRow: React.FC<PostButtonRowProps> = props => {
    const dispatch = useDispatch();
    const { id } = props.post;

    const state = useReduxState((state) => ({
        answers: state.posts.answers[id],
        rePosted: state.posts.rePosted.includes(id),
        rePosts: state.posts.rePosts[id],
        liked: state.posts.liked.includes(id),
        likes: state.posts.likes[id],
    }));

    const [showAnswerModal, setShowAnswerModal] = useState(false);

    const onLikeClick = async () => {
        const client = new LikesClient();
        if (state.liked) {
            await client.removeLike(id);
            dispatch(removeLike(id));
        } else {
            await client.createLike(id);
            dispatch(addLike(id));
        }
    };

    const onRePostClick = async () => {
        const client = new RePostsClient();
        if (state.rePosted) {
            await client.removeRePost(id);
            dispatch(removeRePost(id));
        } else {
            await client.createRePost(id);
            dispatch(addRePost(id));
        }
    };

    return <React.Fragment>
        {showAnswerModal && <PostFormModal answerTo={props.post} onClose={() => setShowAnswerModal(false)} />}
        {!!props.large && <div className="border-t border-b py-3 mt-3">
            <span className="font-bold">{state.rePosts || 0}</span>
            <span className="text-gray-600 mr-5"> Retweets</span>
            <span className="font-bold">{state.likes || 0}</span>
            <span className="text-gray-600"> Likes</span>
        </div>}
        <div className={`flex text-gray-500 w-full ${!!props.large ? "justify-around py-1" : "font-light text-md"}`}>
            <PostButton
                icon={faComment}
                value={state.answers}
                color="primary"
                onClick={() => setShowAnswerModal(true)}
                large={props.large}
            />
            <PostButton
                icon={faRetweet}
                color="green-400"
                onClick={onRePostClick}
                active={state.rePosted}
                value={state.rePosts}
                large={props.large}

            />
            <PostButton
                icon={faHeart}
                color="pink-500"
                onClick={onLikeClick}
                active={state.liked}
                value={state.likes}
                large={props.large}

            />
            <PostButton icon={faShareSquare} color="primary" large={props.large} />
        </div>
    </React.Fragment>

}

export default PostButtonRow;