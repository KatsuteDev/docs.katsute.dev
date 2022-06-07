// Copyright (C) Katsute 2022

import extract from 'extract-zip';
import { https } from 'follow-redirects';
import rimraf from 'rimraf';

import fs from "fs";
import path from "path";

class Main {

    public static async main(): Promise<void> {
        /* CNAME */ {
            fs.copyFileSync(path.join(__dirname, "CNAME"), path.join(__dirname, "_src", "CNAME"));
        }

        /* docs */ {
            await this.downloadJavadoc("https://github.com/KatsuteDev/Mal4J/releases/download/2.8.0/mal4j-2.8.0-javadoc.jar", "mal4j");
            await this.downloadJavadoc("https://github.com/KatsuteDev/OneMTA/releases/download/1.2.0/onemta-1.2.0-javadoc.jar", "onemta");
            await this.downloadJavadoc("https://github.com/KatsuteDev/JCore/releases/download/2.0.1/jcore-2.0.1-javadoc.jar", "jcore");
        }
    }

    public static async downloadJavadoc(url: string, name: string): Promise<void> {
        const src   : string = path.join(__dirname, "_src");
        const folder: string = path.join(src, name);
        const zip   : string = path.join(src, `${name}.zip`);
        const style : string = path.join(folder, "stylesheet.css");

        return new Promise((resolve) => {
            rimraf(folder, () => {
                https
                    .get(url)
                    .on("response", (response) => {
                        response
                            .pipe(fs.createWriteStream(zip))
                            .on("finish", () => {
                                extract(zip, { dir: folder})
                                    .then(() => {
                                        fs.unlinkSync(zip);
                                        fs.writeFileSync(style, `@import url("/dependencies/katsute/css/javadoc.css");\n` + fs.readFileSync(style));
                                        resolve();
                                    });
                            });
                });
            });
        });
    }

}

process.on("unhandledRejection", (error: Error, promise: any) => {
    console.error(`Unhandled rejection at:\n  Promise ${promise}\n  ${error.stack}`);
    process.exit(-1);
});

Main.main().catch((error: Error) => {
    console.error(error.stack!);
    process.exit(-1);
});
