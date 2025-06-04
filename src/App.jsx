import database from "./assets/database.png";
import perfil from "./assets/perfil.jpg";
import axios from "axios";
import { MdNotificationsActive } from "react-icons/md";
import { useState, useEffect } from "react";

const formatCPF = (cpf) => {
  if (!cpf) return "";
  const cpfDigits = cpf.replace(/\D/g, "");
  if (cpfDigits.length !== 11) return cpf; // Return original if not 11 digits
  return cpfDigits.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
};

const formatDateDisplay = (isoDateString) => {
  if (!isoDateString) return "";
  try {
    const date = new Date(isoDateString);
    // Adjust for timezone issues if the date is off by one day
    // This happens if the time is close to midnight UTC
    const userTimezoneOffset = date.getTimezoneOffset() * 60000;
    const correctedDate = new Date(date.getTime() + userTimezoneOffset);
    const day = String(correctedDate.getDate()).padStart(2, "0");
    const month = String(correctedDate.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed
    const year = correctedDate.getFullYear();
    return `${day}/${month}/${year}`;
  } catch (error) {
    console.error("Error formatting date:", error);
    return isoDateString; // Return original if formatting fails
  }
};

const formatTelephone = (tel) => {
  if (!tel) return "";
  const digits = tel.replace(/\D/g, "");
  if (digits.length <= 2) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`; // (XX) XXXX
  if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`; // (XX) XXXX-XXXX (landline)
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`; // (XX) XXXXX-XXXX (mobile)
};

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [telephone, setTelephone] = useState("");
  const [data_birth, setData_birth] = useState("");
  const forms = [
    {
      label: "Name",
      value: name,
      setValue: setName,
      placeholder: "Enter your name",
    },
    {
      label: "Email",
      value: email,
      setValue: setEmail,
      placeholder: "Enter your email",
    },
    {
      label: "CPF",
      value: cpf,
      setValue: setCpf,
      placeholder: "Enter your CPF",
    },
    {
      label: "Telefone",
      value: telephone,
      setValue: setTelephone,
      placeholder: "Enter your telephone",
    },
    {
      label: "Data de nascimento",
      value: data_birth,
      setValue: setData_birth,
      placeholder: "Enter your date of birth",
      type: "date", // Add type="date" for better UX and format
    },
  ];

  useEffect(() => {
    search();
  }, []);

  const search = () => {
    axios
      .get("http://localhost:3000/users")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Erro ao buscar usuários:", error));
  };

  const register = async () => {
    try {
      axios
        .post("http://localhost:3000/users", {
          name,
          email,
          cpf,
          telephone,
          data_birth,
        })
        .then((response) => {
          console.log(response.data);
          setName("");
          setEmail("");
          setCpf("");
          setTelephone("");
          setData_birth("");
        });
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
    }
  };

 const deleteUser = async (id) => {
  try {
    axios.delete(`http://localhost:3000/users/${id}`);
    search();
  } catch (error) {
    console.error("Erro ao deletar usuário:", error);
  }
 }

  return (
    <>
      <div
        className="relative flex min-h-screen flex-col bg-slate-50 overflow-x-hidden"
        style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}
      >
        <header className="flex items-center justify-between border-b border-[#e7edf4] px-10 py-3">
          <div className="flex items-center gap-4 text-[#0d141c]">
            <div className="w-4 h-4">
              <img src={database} alt="" />
            </div>
            <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">
              User Management
            </h2>
          </div>
          <div className="flex flex-1 justify-end gap-5 items-center">
            <div className="flex items-center cursor-pointer hover:bg-[#e7edf4] rounded-full p-2 transition-colors duration-200 ease-in-out border border-[#cedbe8] bg-[#cedbe8] w-12 h-12 justify-center">
              <MdNotificationsActive className="w-6 h-6" />
            </div>
            <img
              src={perfil}
              className="w-14 h-14 rounded-full border border-[#cedbe8] cursor-pointer hover:bg-[#e7edf4] transition-colors duration-200 ease-in-out"
            />
          </div>
        </header>
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="flex flex-col max-w-[960px] flex-1">
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <p className="text-[32px] font-bold tracking-light leading-tight min-w-72">
                User Registration and List
              </p>
            </div>

            {/* Formulário de cadastro de usuários */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 py-3 max-w-[960px]">
              {forms.map((field, idx) => (
                <div key={idx} className="flex flex-col">
                  <label className="text-base font-medium pb-2 pl-1">
                    {field.label}
                  </label>
                  <input
                    value={field.label === 'CPF' ? formatCPF(field.value) : field.label === 'Telefone' ? formatTelephone(field.value) : field.value}
                    onChange={(e) => {
                      if (field.label === 'CPF') {
                        // Store only digits for CPF state
                        field.setValue(e.target.value.replace(/\D/g, "")); // Store only digits
                      } else if (field.label === 'Telefone') {
                        field.setValue(e.target.value.replace(/\D/g, "")); // Store only digits
                      } else {
                        field.setValue(e.target.value);
                      }
                    }}
                    placeholder={field.placeholder}
                    type={field.type || "text"}
                    maxLength={field.label === 'CPF' ? 14 : field.label === 'Telefone' ? 15 : undefined} // CPF: XXX.XXX.XXX-XX (14), Tel: (XX) XXXXX-XXXX (15) // CPF formatted (11 digits + 2 dots + 1 hyphen)
                    className="form-input w-full rounded-lg border border-[#cedbe8] bg-slate-50 h-14 px-4 text-base text-[#0d141c] placeholder-[#49739c] focus:outline-none"
                  />
                </div>
              ))}
            </div>

            {/* Botão de cadastro */}
            <div className="flex px-4 py-3">
              <button
                onClick={register}
                className="h-10 px-4 bg-[#0c7ff2] text-white text-sm font-bold rounded-lg hover:bg-[#0b6dcf] transition-colors duration-200 ease-in-out"
              >
                <span className="truncate">Register</span>
              </button>
            </div>

            {/* Tabela de usuários cadastrados */}
            <h2 className="text-[22px] font-bold tracking-[-0.015em] px-4 pb-3 pt-5">
              Registered Users
            </h2>
            <div className="px-4 py-3">
              <div className="overflow-hidden rounded-lg border border-[#cedbe8] bg-slate-50">
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-50">
                      <th className="p-2 text-left text-sm font-medium text-[#0d141c]">
                        Name
                      </th>
                      <th className="p-2 text-left text-sm font-medium text-[#0d141c]">
                        Email
                      </th>
                      <th className="p-2 text-left text-sm font-medium text-[#0d141c]">
                        CPF
                      </th>
                      <th className="p-2 text-left text-sm font-medium text-[#0d141c]">
                        Phone
                      </th>
                      <th className="p-2 text-left text-sm font-medium text-[#0d141c]">
                        Date of birth
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="border-b border-[#cedbe8]">
                        <td className="p-2">{user.name}</td>
                        <td className="p-2">{user.email}</td>
                        <td className="p-2">{formatCPF(user.cpf)}</td>
                        <td className="p-2">{formatTelephone(user.telephone)}</td>
                        <td className="p-2">{formatDateDisplay(user.data_birth)}</td>
                        <td>
                          <button
                          onClick={() => deleteUser(user.id)}
                          className="p-2 m-2 rounded-lg hover:bg-red-700 flex gap-2 text-white bg-red-600 border border-red-600 w-24 justify-center cursor-pointer">Deletar</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
