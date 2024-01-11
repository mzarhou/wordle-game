import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { api } from "~/trpc/server";

export default async function LeaderBoard() {
  const users = await api.leaderboard.byScore.query({ limit: 10 });
  return (
    <Table className="mt-10">
      <TableCaption>
        {users.length > 0 ? "Leaderboard" : "No user found"}
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>username</TableHead>
          <TableHead>Score</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.username}>
            <TableCell>{user.username}</TableCell>
            <TableCell>{user.score}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
