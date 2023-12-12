export const siteLink = "localhost:7172/";
export const imageLink = `${siteLink}/images/`;

export async function fetchSocialMediaFollowerFeed() {
    const response = await fetch(`${siteLink}/SocialMediaPost/GetFeed`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${/*jwtToken*/1}`,
  },
});
    const resData = await response.json();
    if (!response.ok) {
        throw new Error('Failed to fetch social media posts');
      }
    
      return resData.posts;

}