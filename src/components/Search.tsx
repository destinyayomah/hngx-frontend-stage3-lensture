import { Search2Icon } from "@chakra-ui/icons"
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react"

interface Props {
  handleInputChange: (query: string) => void
}

const Search = ({ handleInputChange }: Props) => {
  return <>
    <InputGroup width='90%' margin='30px 0'>
      <Input
        placeholder='Search...'
        color='white'
        _focus={{ boxShadow: 'none', border: 'none', outlineColor: '#E1662C' }}
        onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => handleInputChange(e.currentTarget.value)}
      />
      <InputLeftElement>
        <Search2Icon
          color='white'
        />
      </InputLeftElement>
    </InputGroup>
  </>
}

export default Search