import httpService from "../../shared/services/http.service";
import configurationService from "../../shared/services/configuration.service";

export default class PostService {

    static create(data) {
        let url = configurationService.createPostUrl;
        return httpService.put(url, data);
    }

    static get() {
        let url = configurationService.getPostsUrl;
        return httpService.get(url);
    }

    static createComment(data) {
        let url = `${configurationService.createCommentUrl+ '/' + data.postId}`;
        return httpService.put(url, {comment: data.comment});
    }

    static deletePost(postId) {
        let url = `${configurationService.deletePostUrl+ '/' + postId}`;
        return httpService.delete(url);
    }
}