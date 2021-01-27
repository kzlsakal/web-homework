# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Homework.Repo.insert!(%Homework.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

defmodule Homework.SeedDatabase do
  alias Homework.Repo
  alias Homework.Transactions.Transaction
  alias Homework.Users.User
  alias Homework.Merchants.Merchant
  import UUID, only: [uuid1: 1]
  import Faker

  #
  # Populate Users
  #
  user_id_list = Enum.map(1..10, fn _ -> UUID.uuid1() end)
  users_list = Enum.map(user_id_list, fn id ->
    %{month: month, day: day, year: year} = Faker.Date.date_of_birth(18..50)
    inserted_date = NaiveDateTime.truncate(Faker.DateTime.backward(15), :second)
    %{
      id: id,
      first_name: Faker.Person.first_name(),
      last_name: Faker.Person.last_name(),
      dob: "#{month}/#{day}/#{year}",
      inserted_at: inserted_date,
      updated_at: inserted_date
    }
    end
  )

  #
  # Populate Merchants
  #
  merchant_id_list = Enum.map(1..20, fn _ -> UUID.uuid1() end)
  merchants_list = Enum.map(merchant_id_list, fn id ->
    inserted_date = NaiveDateTime.truncate(Faker.DateTime.backward(15), :second)
    %{
      id: id,
      name: Faker.Company.En.name(),
      description: Faker.Industry.sector(),
      inserted_at: inserted_date,
      updated_at: inserted_date
    }
    end
  )

  #
  # Populate Companies (to be added)
  #
  company_id_list = Enum.map(1..10, fn _ -> UUID.uuid1() end)
  company_list = Enum.map(company_id_list, fn id ->
    inserted_date = NaiveDateTime.truncate(Faker.DateTime.backward(15), :second)
    %{
      id: id,
      name: Faker.Company.En.name(),
      inserted_at: inserted_date,
      updated_at: inserted_date
    }
    end
  )

  #
  # Populate Transactions
  #
  transaction_id_list = Enum.map(1..51, fn _ -> UUID.uuid1() end)
  transactions_list = Enum.map(transaction_id_list, fn id ->
    inserted_date = NaiveDateTime.truncate(Faker.DateTime.backward(15), :second)
    credit = Enum.random([true, false])
    debit = not credit
    %{
      id: id,
      amount: :rand.uniform(399) * 1000,
      credit: credit,
      debit: debit,
      description: Faker.Commerce.En.department(),
      user_id: Enum.random(user_id_list),
      merchant_id: Enum.random(merchant_id_list),
      inserted_at: inserted_date,
      updated_at: inserted_date
    }
    end
  )

  #
  # Delete existing Transactions, Users, and Merchants in order
  #
  Repo.delete_all(Transaction)
  Repo.delete_all(User)
  Repo.delete_all(Merchant)

  #
  # Insert Users, Merchants, and Transactions in order
  #
  Repo.insert_all(User, users_list)
  Repo.insert_all(Merchant, merchants_list)
  Repo.insert_all(Transaction, transactions_list)
end
