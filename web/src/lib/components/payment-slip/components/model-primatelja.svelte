<script lang="ts">
  export let model_primatelja: string;
  let key = Math.random();
</script>

<select
  bind:value={model_primatelja}
  class="form-field form-field--model"
  maxlength="4"
  id="{key}-model_primatelja"
  ><option value="" />
  <option value="HR00">HR00</option><option value="HR01">HR01</option><option
    value="HR02">HR02</option
  ><option value="HR03">HR03</option><option value="HR04">HR04</option><option
    value="HR05">HR05</option
  ><option value="HR06">HR06</option><option value="HR07">HR07</option><option
    value="HR08">HR08</option
  ><option value="HR09">HR09</option><option value="HR10">HR10</option><option
    value="HR11">HR11</option
  ><option value="HR12">HR12</option><option value="HR13">HR13</option><option
    value="HR14">HR14</option
  ><option value="HR15">HR15</option><option value="HR16">HR16</option><option
    value="HR17">HR17</option
  ><option value="HR18">HR18</option><option value="HR23">HR23</option><option
    value="HR24">HR24</option
  ><option value="HR26">HR26</option><option value="HR27">HR27</option><option
    value="HR28">HR28</option
  ><option value="HR29">HR29</option><option value="HR30">HR30</option><option
    value="HR31">HR31</option
  ><option value="HR33">HR33</option><option value="HR34">HR34</option><option
    value="HR40">HR40</option
  ><option value="HR41">HR41</option><option value="HR42">HR42</option><option
    value="HR43">HR43</option
  ><option value="HR55">HR55</option><option value="HR62">HR62</option><option
    value="HR63">HR63</option
  ><option value="HR64">HR64</option><option value="HR65">HR65</option><option
    value="HR67">HR67</option
  ><option value="HR68">HR68</option><option value="HR69">HR69</option><option
    value="HR99">HR99</option
  ><option value="HR25">HR25</option><option value="HR83">HR83</option><option
    value="HR84">HR84</option
  ><option value="HR50">HR50</option></select
>
