declare namespace Entities {
    
  export interface IPost extends Creatable {
    _id: mongoose.Schema.Types.ObjectId
    userId: mongoose.Schema.Types.ObjectId;
    text: string;
    images?: string[];
    likes?: ILike[];
    comments?: IComment[];
    createdAt?: Date;
    updatedAt?: Date;
  }
  export interface IComment extends Creatable {
    _id: mongoose.Schema.Types.ObjectId
    userId: mongoose.Schema.Types.ObjectId;
    text: string;
    likes?: ILike[]
    replies?: IReply[];
    createdAt?: Date;
    updatedAt?: Date;
  }

  export interface ILike extends Creatable {
    _id: mongoose.Schema.Types.ObjectId
    userId: mongoose.Schema.Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
  }
  export interface IReply extends Creatable {
    _id: mongoose.Schema.Types.ObjectId
    userId: mongoose.Schema.Types.ObjectId;
    text: string;
    likes?: ILike[];
    createdAt?: Date;
    updatedAt?: Date;
  }
  
}