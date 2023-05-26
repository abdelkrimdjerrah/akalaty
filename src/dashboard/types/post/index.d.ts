declare namespace Entities {
  export interface PostEntity extends Creatable {
    user: string;

    text: string;

    images?: [string];

    likes?: [string];

    comments?: [
      {
        user: string;
        comment: string;
      }
    ];
  }
}