interface PostModal {
  id: number;
  title: string;
  content: string;
  imageId: number;
  userId: number;
  likes: Array<number>;
  comments: Array<number>;
  saved: Array<number>;
}

export default PostModal;