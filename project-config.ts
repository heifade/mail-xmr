
import { ProjectConfigModel } from "pcreate-config";

let projectConfig: ProjectConfigModel = {
  projectType: "node",
  compile: {
    outDir: "./es/",
    module: "commonjs",
    target: "es5",
    lib: ["es2015", "es2015.promise", "es2015.symbol"],
    declaration: true
  },
  command: true,
  documents: false,
  unitTest: false,
  sourceInclude: ["./src/**/*"]
};

export default projectConfig;
    