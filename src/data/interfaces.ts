/////////////////// Interface of projects ////////////////////
interface Project{
    id: string;
    title: string;
    createdate: Date;
    updatedate: Date;
    description : string;
    github: string;
    image: {src:{src:string}}[];
    socials: {src:{src:string}}[];
    technology: string;
    platform: string;
}

/////////////////// Interface of about ////////////////////
interface About{
    id: string;
    email: string;
    createdate: Date;
    updatedate: Date;
    introduction : string;
    phone: number;
    network: {type: []};
    image: [];
    name: string;
}

/////////////////// Interface of service ////////////////////
interface Service{
    id: string;
    createdate: Date;
    updatedate: Date;
    title: string;
    description : string;
    icon_id: string;
    image: {type:string}
}

/////////////////// Interface of resume ////////////////////
interface Resume {
    id: string;
    createdate: Date;
    updatedate: Date;
    experiences:{type:string}[];
    languages: [];
    skills: [];
    image:[];
}

export type {Project, Service, Resume, About}