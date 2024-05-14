import { ITweetActionService } from '@interfaces/ITweetsActionService';
import { BACKEND_URL } from '@constants/constants';
import { Tweet } from '@models/tweet';

export class OnionTweetActionService implements ITweetActionService {

    async commentOnTweet(comment: any, token: string): Promise<{ success: boolean; error?: any }> {
        try {
            const body = JSON.stringify({
                'content': comment.content,
                'signature': '3fa7b8c16da242dfb517c7da264349feda291112baba6dcb12fd234567890abc3fa7b8c16da242dfb517c7da264349feda291112baba6dcb12fd234567890abc', //TODO: Change this
            });
            const ParentPostID = comment.parentTweetId;

            const response = this.sendRequest(`${BACKEND_URL}/post/${ParentPostID}/comment`, 'POST', token, body);

            return { success: true };
        } catch (error) {
            return { success: false, error };
        }
    }

    async deleteTweet(tweetId: string, token: string): Promise<{ success: boolean; error?: string }> {
        throw new Error('Method not implemented.');
    }

    async highlightTweet(userId: string, tweetId: string, token: string): Promise<{
        success: boolean;
        error?: string
    }> {
        const response = await this.sendRequest(`${BACKEND_URL}/interaction/highlight/${tweetId}`, 'POST', token);
        if (!response.success) {
            throw new Error('Failed to highlight tweet');
        }
        return { success: true };
    }

    async likeTweet(userId: string, tweetId: string, token: string): Promise<{ success: boolean; error?: string }> {
        const response = await this.sendRequest(`${BACKEND_URL}/interaction/like/${tweetId}`, 'POST', token);
        if (!response.success) {
            throw new Error('Failed to like tweet');
        }
        return { success: true };
    }

    async postTweet(tweet: Tweet, token: string, additionalData?: any): Promise<{ success: boolean; error?: any }> {
        try {
            const body = JSON.stringify({
                'userId': tweet.userId,
                'content': tweet.content,
                'signature': '3fa7b8c16da242dfb517c7da264349feda291112baba6dcb12fd234567890abc3fa7b8c16da242dfb517c7da264349feda291112baba6dcb12fd234567890abc', //TODO: Change this
                'type': 'Original', //TODO: Change this
                'mediaUrl': tweet.mediaUrl,
                'mediaType': tweet.mediaType,
            });

            const response = this.sendRequest(`${BACKEND_URL}/post/create`, 'POST', token, body);


            return { success: true };
        } catch (error) {
            return { success: false, error };
        }

    }

    async retweet(tweetId: string, token: string): Promise<{ success: boolean; error?: string }> {
        const response = await this.sendRequest(`${BACKEND_URL}/interaction/retweet/${tweetId}`, 'POST', token);
        if (!response.success) {
            throw new Error('Failed to retweet');
        }
        return { success: true };
    }

    async uploadMedia(file: File, token: string): Promise<{ success: boolean; downloadURL?: string; error?: string }> {
        throw new Error('Method not implemented.');
    }

    private async sendRequest(url: string, method: 'POST' | 'PUT' | 'PATCH', token: string, body?: string): Promise<any> {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        };
        const response = await fetch(url, { method, headers, body });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to ${method} data: ${errorData.message}`);
        }
        return response.json();
    }

}