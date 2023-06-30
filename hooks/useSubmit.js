const UseSubmit = () => {
  const sendMessage = async ({ message, setData }) => {
    setData({ loading: true, data: null });
    try {
      setData({ loading: false, data: null });
    } catch (error) {
      setData({ loading: false, data: null });
    }
  };
  return { sendMessage };
};
export default UseSubmit;
