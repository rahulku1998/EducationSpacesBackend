exports.isAdmin = (req, res, next) => {
  if(!req.user){
    return res.status(401).json({
      message:"Login is required"
    })
  }
  if(req.user.role!=="ADMIN"){
   return  res.status(403).json({
      message:"Only Admin is allowed,you are not allowed to access this route"
    })
  }
  next();
};
