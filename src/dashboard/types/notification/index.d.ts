declare namespace Entities {

  export enum notifTypes {
    "postLiked",
    "commentLiked",
    "replyLiked",
    "feedbackLiked",
    "commentCreated",
    "replyCreated",
    "starredRecipe",
    "feedbackCreated",
    "followed",
  }

  export interface NotifEntity extends Creatable {
    _id: mongoose.Schema.Types.ObjectId;
    toUserId: mongoose.Schema.Types.ObjectId;
    byUserId: mongoose.Schema.Types.ObjectId;
    type: notifTypes;
    text: string;
    url: string;
    isRead: boolean;
    createdAt?: Date;
    updatedAt?: Date;
  }
}
