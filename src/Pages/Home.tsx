
import { useState } from "react";
import { useFormik } from "formik";

type User = {
  id: number;
  name: string;
  job: string;
  status: boolean;
};

type FormValues = {
  name: string;
  job: string;
  status: string;
};

const initialUsers: User[] = [
  {
    id: 1,
    name: "Abdullo",
    job: "Student",
    status: true,
  },
  {
    id: 2,
    name: "Muhammad",
    job: "Teacher",
    status: false,
  },
  {
    id: 3,
    name: "Qurbon",
    job: "Singer",
    status: true,
  },
];

const Home = () => {
  const [data, setData] = useState<User[]>(initialUsers);
  const [editId, setEditId] = useState<number | null>(null);

  const formik = useFormik<FormValues>({
    initialValues: {
      name: "",
      job: "",
      status: "true",
    },

    validate: (values) => {
      const errors: Partial<FormValues> = {};

      if (!values.name.trim()) {
        errors.name = "Name is required";
      }

      if (!values.job.trim()) {
        errors.job = "Job is required";
      }

      return errors;
    },

    onSubmit: (values, { resetForm }) => {
      if (editId !== null) {
        setData((prev) =>
          prev.map((el) =>
            el.id === editId
              ? {
                  ...el,
                  name: values.name.trim(),
                  job: values.job.trim(),
                  status: values.status === "true",
                }
              : el
          )
        );

        setEditId(null);
      } else {
        const newUser: User = {
          id: Date.now(),
          name: values.name.trim(),
          job: values.job.trim(),
          status: values.status === "true",
        };

        setData((prev) => [...prev, newUser]);
      }

      resetForm();
    },
  });

  const handleEdit = (user: User) => {
    setEditId(user.id);

    formik.setValues({
      name: user.name,
      job: user.job,
      status: String(user.status),
    });

    formik.setTouched({});
  };

  const handleDelete = (id: number) => {
    setData((prev) => prev.filter((el) => el.id !== id));

    if (editId === id) {
      setEditId(null);
      formik.resetForm();
    }
  };

  return (
    <div className="p-5">
      <form
        aria-label="user-form"
        onSubmit={formik.handleSubmit}
        className="flex flex-col gap-3 mb-5"
      >
        <div>
          <input
            name="name"
            placeholder="Name"
            className="border p-2 rounded"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          {formik.touched.name && formik.errors.name && (
            <p className="text-red-500">
              {formik.errors.name}
            </p>
          )}
        </div>

        <div>
          <input
            name="job"
            placeholder="Job"
            className="border p-2 rounded"
            value={formik.values.job}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          {formik.touched.job && formik.errors.job && (
            <p className="text-red-500">
              {formik.errors.job}
            </p>
          )}
        </div>

        <select
          name="status"
          className="border p-2 rounded"
          value={formik.values.status}
          onChange={formik.handleChange}
        >
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>

        <button
          className="bg-blue-500 text-white p-2 rounded"
          type="submit"
        >
          {editId !== null ? "Edit" : "Add"}
        </button>
      </form>

      {data.map((el) => (
        <div
          key={el.id}
          className="border p-3 rounded mb-3"
        >
          <h1>{el.name}</h1>
          <p>{el.job}</p>
          <p>{el.status ? "Active" : "Inactive"}</p>

          <button
            className="bg-yellow-500 text-white p-2 rounded mr-2"
            type="button"
            onClick={() => handleEdit(el)}
          >
            Edit
          </button>

          <button
            className="bg-red-500 text-white p-2 rounded"
            type="button"
            onClick={() => handleDelete(el.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default Home;
