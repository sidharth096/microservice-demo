import pirsma from "../config/db.config.js";
import axios from "axios";
class postController {
  static async index(req, res) {
    try {
      console.log("hello");

      const posts = await pirsma.post.findMany({});

      // Method 1
      // const postWithUsers = await Promise.all(
      //   posts.map(async(post) => {
      //    const res = await axios.get(`${process.env.AUTH_MICRO_URL}/getUser/${post.user_id}`);
      //    console.log("res.data", res.data);

      //    return {
      //     ...post,
      //     ...res.data
      //    }
      //   })
      // );

      // Method 2
      // let userIds = []
      // posts.forEach((post) => {
      //   userIds.push(post.user_id)
      // })

      // const response = await axios.post(`${process.env.AUTH_MICRO_URL}/getUsers`,userIds)

      // console.log("users", response.data);
      // const {users} = response.data

      // const postWithUsers = await Promise.all(
      //   posts.map((post)=>{
      //     const user = users.find((item)=>item.id === post.user_id)
      //     return{
      //       ...post,
      //       user
      //     }
      //   })
      // )

      //Method 3
      let userIds = []
      posts.forEach((post) => {
        userIds.push(post.user_id)
      })

      //Fetch users
      
      const response = await axios.post(
        `${process.env.AUTH_MICRO_URL}/getUsers`,userIds
      );
      const users ={}
    
      response.data.users.forEach((user) => {
        users[user.id] = user
      })

      const postWithUsers = await Promise.all(
        posts.map(async (post) => {
          const user = users[post.user_id];

          return {
            ...post,
            user
          }
        })

       
      );

      return res.status(200).json({ postWithUsers });
    } catch (error) {
      console.log("error", error);

      return res.status(500).json({ message: error.message });
    }
  }

  static async store(req, res) {
    try {
      const authUser = req.user;
      const { title, content } = req.body;

      console.log("authUser", authUser);
      console.log('req.body',req.body);

      const post = await pirsma.post.create({
        data: {
          user_id: authUser.id,          
          title,
          content,
        },
      });

      return res
        .status(201)
        .json({ message: "Post created successfully", post });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

export default postController;
