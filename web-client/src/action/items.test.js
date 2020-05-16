import axios from "axios";
import { findAll } from "./items";
jest.mock("axios");
describe("findAll get items", () => {
  it("fetches successfully data from an API", async () => {
    const data = [
      {
        id: 1,
        name: indomie
      }
    ];
    axios.get.mockImplementationOnce(() => Promise.resolve(data));
    await expect(findAll("react")).resolves.toEqual(data);
    expect(axios.get).toHaveBeenCalledWith(`items`);
  });
});
