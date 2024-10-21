import prisma from "../config/db.config.js";

class userController {
  static async getUser(req, res) {
    try {
      const { id } = req.params;

      const user = await prisma.user.findUnique({
        where: {
          id: id,
        },
        select: {
          id: true,
          name: true,
          email: true,
        }
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.status(200).json({ user: user });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async getUsers(req,res){
    console.log("req.body", req.body);
    
   
    const {userIds} = req.body;
    const users = await prisma.user.findMany({
      where:{
        id:{
          in:userIds
        }
      },
      select:{
        id:true,
        name:true,
        email:true
      }
    });
    return res.status(200).json({users:users});
  }
}

export default userController;
