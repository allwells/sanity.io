export default interface Post {
  _id: string;
  title: string;
  overview: string;
  content: any;
  slug: {
    current: string;
  };
  _createdAt: string;
}
