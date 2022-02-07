import React from "react";

interface Props {}

const ReactScroll: React.FC<Props> = (): JSX.Element => {
  const [page, setPage] = React.useState(1);
  const [users, setUsers] = React.useState<any>([]);
  const [loading, setLoading] = React.useState(true);

  const handleScroll = (event: any) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
    console.log("scrollTop", scrollTop);
    console.log("clientHeight", clientHeight);
    console.log("scrollHeight", scrollHeight);

    // if (scrollHeight - scrollTop === clientHeight) {
    //   setPage((prev) => prev + 1);
    // }

    if (scrollTop > (scrollHeight - clientHeight) / 2 && !loading) {
      setPage((prev) => prev + 1);
    }
  };

  React.useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      const response: any = await fetch(
        `https://randomuser.me/api/?page=${page}&results=20`
      );
      const userList = await response.json();
      const newUsers = userList.results;
      setUsers((prev: any) => [...prev, ...newUsers]);
      setLoading(false);
    };

    loadUsers();
  }, [page]);

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          style={{ maxHeight: 300, overflowY: `scroll` }}
          onScroll={handleScroll}
        >
          {users &&
            users.map((user: any) => <div key={user.cell}>{user.email}</div>)}
        </div>
      </div>
      {loading && <div>{`Loading ...`}</div>}
    </>
  );
};

export default ReactScroll;
