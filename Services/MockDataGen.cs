using System.Collections.Generic;
using System;

namespace Portal.Services
{
    static class MockDataGen
    {
        static Random rnd = new Random();

        public static string GenText(int min, int max = 0)
        {
            var words = new List<string>();
            for (int i = 0; i < (max == 0 ? min : rnd.Next(min, max)); i++)
                words.Add(GenString(2, 20));
            return string.Join(" ", words);
        }

        public static string GenString(int min, int max)
        {
            var result = new char[rnd.Next(min, max)];
            for (int i = 0; i < result.Length; i++)
                result[i] = (char)(GenNum(65, 91));
            return new string(result);
        }

        public static int GenNum(int min, int max = 0)
        {
            if (max == 0) return min;
            return rnd.Next(min, max);
        }
    }
}