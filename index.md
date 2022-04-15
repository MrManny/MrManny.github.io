## Welcome

![Me](img/slowly.png)

Hi everyone!

### Business

```js
import { MrManny, NonUniversityResearchOrganization } from "@MrManny/world";

describe("MrManny", () => {
  it("is a Research Engineer", () => {
    expect(MrManny).toHaveProperty("position", "Research Engineer");
    expect(MrManny).toHaveProperty("dept", "Digital Safety & Security");
    expect(MrManny).toHaveProperty("org");
    expect(MrManny.org).toBeInstanceOf(NonUniversityResearchOrganization);
  });

  it("lives in Austria", () => {
    expect(MrManny).toHaveProperty("country", "Austria");
  });

  it("is not ancient yet", () => {
    expect(MrManny).toHaveProperty("age");
    expect(MrManny.age).toBeGreaterThanOrEqual(35);
    expect(MrManny.age).toBeLessThanOrEqual(40);
  });

  it("has experience", () => {
    expect(
      MrManny
        .experience
        .find((experience) => /^(Software (Architect|Engineer))|Research Engineer$/i.test(experience.position)
        .reduce((acc, cur) => acc + cur.asYears), 0)
    ).toBeGreaterThan(15);  // getting closer to 20 now, my goodness!
  });

  it("knows some technology", () => {
    [
      "Docker",
      "ElasticSearch",
      "ffmpeg",
      "InfluxDB",
      "JavaScript",
      "Jest",
      "MongoDB",
      "MySQL/MariaDB",
      "NestJS",
      "Node.js",
      "OpenStack",
      "Redis",
      "TypeScript",
      "Vue.js",
      // I could go on, but it's getting meh from here on out. Or do you really want to hear about Ruby?
      // As much as it didn't catch on, I love the poetic syntax of Ruby, and its sugar.
    ].forEach((technology) => {
      expect(
        MrManny
          .skills
          .find((skill) => skill.isRecent === true)
      ).toContain(technology);
    });
  });

  it("has been certified for things once", () => {
    [
      "Bespoke OpenStack", // issued 2021
      "CIS IS Manager", // ISO 27001; issued 11/2016, expired 11/2019
      "Hacking Mobile Devices", // issued 10/2016
      // probably one or two more I forgot about
      // TODO(mw): remember to add them
    ].forEach((certification) => {
      expect(MrManny.certifications).toContain(certification);
    });
  });

  it("has published stuff", () => {
    const books = MrManny
      .publications
      .find((publication) => publication.isBook === true);
    expect(books.length).toBeGreaterThanOrEqual(1);

    const researchArticles = MrManny
      .publications
      .find((publication) => publication.isResearch === true);
    expect(researchArticles.length).toBeGreaterThanOrEqual(10);

    // cf. ResearchGate
  });

  it("isn't a brainless zombie privately", () => {
    [
      "3d printing",
      "ants",
      "archery",
      "CAD",
      "cats",
      "dogs",
      "gaming",
      "GIS",
      "mapping",
      "LEGO",
      "TV series",
    ].forEach((hobby) => {
      expect(MrManny.hobbies).toContain(hobby);
    });
  });

  it("is for hire?!", () => {
    // TODO(mw): come up with a test case 😉
  });
});
```

For business stuff, you can probably just check out my [LinkedIn] profile, I guess.

I know my [GitHub] profile is a bit barren; my main contributions are usually held in private organization
repositories. I swear, I will try to do *something* useful with my GitHub profile some day!

### Private

Privately, I am…
- a **gamer**: board games, video games, role-playing games, tabletop games; you name it!
               *Terraforming Mars* is great, by the way. Don't @ me.
- an **archer**: currently shooting with a 28 lbs recurve bow. Sometimes, I also hit things.
- a **mapper**: I spend some time to survey for OpenStreetMap sometimes.
                I am no stranger to geographic information systems.
- an **additive manufacturing** enthusiast: this is slang for "I know 3d printing, and I know some CAD".
- a friend of **animals**: I have had cats and ants
                           ([Messor Barbarus](https://en.wikipedia.org/wiki/Messor_barbarus)) before, currently I have a
                           Labrador.

### Language Skills

- German (native)
- English (fluent)
- ~~Latin (extremely rusty)~~
- ~~Ancient Greek (extremely rusty)~~
- a plethora of programming and mark-up languages

### Find me

In alphabetical order, you can find me here:

- [GitHub], even if it's puny right now
- [LinkedIn] (new, and only signed up reluctantly)
- [OpenStreetMap]
- [ResearchGate]

I also exist on Reddit in a mainly read-only capacity. `r/netsec` is a great read though!
I am also no stranger to Twitch.
Or Steam.
Or Discord.
But outside that, it's slim pickings. Sorry!

[GitHub]: https://github.com/MrManny
[LinkedIn]: https://www.linkedin.com/in/manuel-w-a54850235/
[OpenStreetMap]: https://www.openstreetmap.org/user/MrManny
[ResearchGate]: https://www.researchgate.net/profile/Manuel-Warum
