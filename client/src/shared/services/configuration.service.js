
class ConfigurationService {
    static loginUrl = 'auth/doLogin';
    static signupUrl = 'auth/doSignup';
    
    static createPostUrl = 'post/create';
    static getPostsUrl = 'post/posts';
    static createCommentUrl = 'post/comment/create';
    static deletePostUrl = 'post/delete';
    static deleteCommentUrl = 'post/comment/delete';
}

export default ConfigurationService;