import { ReactNode } from "react";

const App = () => {
  const courseName = "Half Stack application development";

  interface CoursePartBase {
    name: string;
    exerciseCount: number;
    type: string;
  }

  interface CourseDescription extends CoursePartBase {
    description: string;
  }

  interface CourseNormalPart extends CoursePartBase, CourseDescription {
    type: "normal";
  }

  interface CourseProjectPart extends CoursePartBase {
    type: "groupProject";
    groupProjectCount: number;
  }

  interface CourseSubmissionPart extends CoursePartBase, CourseDescription {
    type: "submission";
    exerciseSubmissionLink: string;
  }

  interface CourseSpecialPart extends CoursePartBase, CourseDescription {
    type: "special";
    requirements: Array<string>;
  }

  type CoursePart =
    | CourseNormalPart
    | CourseProjectPart
    | CourseSubmissionPart
    | CourseSpecialPart;

  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is the easy course part",
      type: "normal",
    },
    {
      name: "Advanced",
      exerciseCount: 7,
      description: "This is the hard course part",
      type: "normal",
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      type: "groupProject",
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
      type: "submission",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      type: "special",
    },
  ];

  interface Name {
    header: string;
  }

  const Header = (props: Name) => {
    return <h1>{props.header}</h1>;
  };

  interface partsProps {
    courseParts: {
      name: string;
      exerciseCount: number;
      type: string;
      description?: string;
      groupProjectCount?: number;
      exerciseSubmissionLink?: string;
      requirements?: Array<string>;
    }[];
  }

  const Part = (props: partsProps) => {
    const allParts: Array<ReactNode> = [];
    props.courseParts.forEach((part) => {
      switch (part.type) {
        case "normal":
          allParts.push(
            <div key={part.name}>
              <h3>
                {part.name} {part.exerciseCount}
              </h3>
              <p>{part.description}</p>
            </div>
          );
          break;
        case "groupProject":
          allParts.push(
            <div key={part.name}>
              <h3>
                {part.name} {part.exerciseCount}
              </h3>
              <p>project exercises {part.groupProjectCount}</p>
            </div>
          );
          break;
        case "submission":
          allParts.push(
            <div key={part.name}>
              <h3>
                {part.name} {part.exerciseCount}
              </h3>
              <p>{part.description}</p>
              <p>submit to {part.exerciseSubmissionLink}</p>
            </div>
          );
          break;
        case "special":
          allParts.push(
            <div key={part.name}>
              <h3>
                {part.name} {part.exerciseCount}
              </h3>
              <p>{part.description}</p>
              <p>required skils: {part.requirements?.join(", ")}</p>
            </div>
          );
          break;
        default:
          allParts.push(<h3>not normal</h3>);
      }
    });
    return <div>{allParts.map((part) => part)}</div>;
  };

  const Content = (props: partsProps) => {
    return (
      <div>
        <Part courseParts={props.courseParts} />
      </div>
    );
  };

  interface Total {
    total: number;
  }

  const Total = (props: Total) => {
    return <h4>Number of exercises {props.total}</h4>;
  };

  return (
    <div>
      <Header header={courseName} />
      <Content courseParts={courseParts} />
      <Total
        total={courseParts.reduce(
          (carry, part) => carry + part.exerciseCount,
          0
        )}
      />
    </div>
  );
};

export default App;
