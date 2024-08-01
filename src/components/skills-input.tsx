import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";

interface SkillsInputProps {
  skills: string[];
  setSkills: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function SkillsInput({ skills, setSkills }: SkillsInputProps) {
  const [skill, setSkill] = useState<string>("");

  const addSkill = () => {
    if (skill && !skills.includes(skill)) {
      setSkills([...skills, skill]);
      setSkill("");
    }
  };

  const removeSkill = (index: number) => {
    const newSkills = skills.filter((_, i) => i !== index);
    setSkills(newSkills);
  };

  return (
    <div className="flex flex-col gap-y-2">
      <Label htmlFor="skills">Skills</Label>
      <div className="flex gap-2">
        <Input
          id="skills"
          type="text"
          placeholder="Add a skill"
          required
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
        />
        <Button type="button" onClick={addSkill}>
          Add
        </Button>
      </div>
      <ul className="flex flex-wrap gap-2 mt-2">
        {skills.map((skill, index) => (
          <li key={index} className="bg-gray-200 p-2 rounded flex items-center">
            {skill}
            <Button
              type="button"
              variant="destructive"
              className="h-2 w-2 px-2"
              onClick={() => removeSkill(index)}
            >
              x
            </Button>
          </li>
        ))}
      </ul>
      <input type="hidden" name="skills" value={JSON.stringify(skills)} />
    </div>
  );
}
