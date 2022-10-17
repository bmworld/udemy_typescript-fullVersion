// # Project Type

// - 타입정의 시, 식별자만 필요한 경우, 사용하기 딱 좋다.
export enum ProjectStatus {
  Active,
  Finished,
}

export class Project {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public people: number,
    public status: ProjectStatus
  ) {}
}
