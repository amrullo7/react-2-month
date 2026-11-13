
import { useState } from "react";
import { useForm } from "react-hook-form";

type User = {
  name: string;
  id: number;
  job: string;
  status: boolean;
};

type valuesrf = {
  name: string;
  job: string;
  status: string;
};

const Home = () => {
  const { register, handleSubmit, reset } = useForm<valuesrf>({
    defaultValues: {
      name: "",
      job: "",
      status: "true",
    },
  });

  const [elem, setElem] = useState<User | null>(null);

  const [data, setData] = useState<User[]>([
    { name: "Abdullo", id: 1, job: "Student", status: true },
    { name: "Muhammad", id: 2, job: "Teacher", status: false },
    { name: "Qurbon", id: 3, job: "Singer", status: true },
  ]);

  function handleDelete(id: number) {
    setData((prev) => prev.filter((e) => e.id !== id));
  }

  function handleEdit(user: User) {
    setElem(user);
    reset({
      name: user.name,
      job: user.job,
      status: String(user.status),
    });
  }

  function handleAdd(values: valuesrf) {
    const newUser: User = {
      name: values.name,
      job: values.job,
      id: elem ? elem.id : Date.now(),
      status: values.status === "true",
    };

    if (elem) {
      setData((prev) =>
        prev.map((e) => (e.id === elem.id ? newUser : e))
      );
    } else {
      setData((prev) => [...prev, newUser]);
    }

    setElem(null);
    reset();
  }

  return (
    <div className="p-5">
      <form onSubmit={handleSubmit(handleAdd)} className="flex gap-2 mb-5">
        <input className="border p-2 rounded" placeholder="Name" {...register("name")} />
        <input className="border p-2 rounded" placeholder="Job" {...register("job")} />

        <select className="border p-2 rounded" {...register("status")}>
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>

        <button className="bg-blue-500 text-white p-2 rounded" type="submit">
          {elem ? "Edit" : "Add"}
        </button>
      </form>

      {data.map((e) => (
        <div key={e.id} className="border p-3 rounded mb-3">
          <h1>{e.name}</h1>
          <p>{e.job}</p>
          <p>{e.status ? "Active" : "Inactive"}</p>

          <button className="bg-yellow-500 text-white p-2 rounded mr-2" type="button" onClick={() => handleEdit(e)}>
            Edit
          </button>

          <button className="bg-red-500 text-white p-2 rounded" type="button" onClick={() => handleDelete(e.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default Home;
