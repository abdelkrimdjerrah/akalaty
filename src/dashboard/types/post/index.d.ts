declare namespace Entities {
  export interface PostEntity extends Creatable {
    _id: string;

    user: string;

    text: string;

    images?: [string];

    likes?: [string];

    comments?: [
      {
        _id: string;
        user: string;
        text: string;
        createdAt?: Date;
        updatedAt?: Date;
      }
    ];

    createdAt?: Date;

    updatedAt?: Date;
  }

  export interface PostCommentEntity extends Creatable {
    _id: string;
    userId: string;
    text: string;
    createdAt?: Date;
    updatedAt?: Date;
  }
  
}